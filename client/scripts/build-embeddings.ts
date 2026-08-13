/**
 * Chunks the knowledge base and embeds each chunk, producing the vector store
 * the chatbot retrieves from.
 *
 * Chunking is *semantic*, not fixed-window: the knowledge base is authored so
 * that every `## ` heading is a self-contained topic (one solution, one case
 * study, one role), so the heading boundary is the chunk boundary. Fixed-size
 * windows would cut a solution's outcomes away from its name, and a chunk that
 * doesn't say what it's about is close to useless once retrieved in isolation.
 *
 * Oversized sections are split on paragraph boundaries with the heading
 * re-attached to every piece, so each part still carries its own subject.
 *
 *   npm run knowledge:build      (generate + chunk + embed)
 *   npm run embeddings:build     (chunk + embed only)
 *
 * Requires OPENAI_API_KEY. Cost is a fraction of a cent per full rebuild at
 * text-embedding-3-small's $0.02 / 1M tokens.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import OpenAI from "openai";

const KNOWLEDGE_DIR = join(process.cwd(), "src", "data", "knowledge");
const SOURCES = ["knowledge-base.generated.md", "knowledge-base.manual.md"];
const OUT_PATH = join(KNOWLEDGE_DIR, "embeddings.json");

const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small";

/**
 * Chunk size ceiling in characters (~4 chars/token, so ~450 tokens). Large
 * enough that most authored sections survive intact, small enough that a
 * retrieved chunk is mostly signal rather than one relevant line buried in
 * three paragraphs of unrelated text.
 */
const MAX_CHUNK_CHARS = 1800;
/**
 * Floor below which a trailing split is folded back into the previous chunk
 * rather than embedded on its own. Roughly "heading plus a sentence" — below
 * that a chunk is mostly its own title and adds noise to top-k.
 */
const MIN_CHUNK_CHARS = 400;
/** Batch size for the embeddings endpoint — it accepts an array of inputs. */
const BATCH_SIZE = 64;

export type Chunk = {
  id: string;
  /** The `## ` heading this chunk came from — shown as the citation label. */
  heading: string;
  /** Source file, so a wrong answer can be traced to generated vs manual. */
  source: string;
  text: string;
  embedding: number[];
};

/** Splits a markdown document into one entry per `## ` heading. */
function splitIntoSections(markdown: string, source: string) {
  // Strip HTML comments so authoring notes never reach the model.
  const cleaned = markdown.replace(/<!--[\s\S]*?-->/g, "");
  const parts = cleaned.split(/^## /m).slice(1); // drop the `# ` title preamble

  return parts.flatMap((part) => {
    const newline = part.indexOf("\n");
    const heading = part.slice(0, newline === -1 ? undefined : newline).trim();
    const body = newline === -1 ? "" : part.slice(newline).trim();

    // Skip unfilled placeholder sections in the manual file — an empty or
    // TODO-only section embeds as noise that competes with real answers.
    if (!body || body.includes("TODO:")) return [];

    return splitOversized(heading, body).map((text) => ({ heading, source, text }));
  });
}

/**
 * Splits a too-long section on blank lines, repeating the heading into each
 * piece so every chunk still names its own subject.
 */
function splitOversized(heading: string, body: string): string[] {
  const prefix = `${heading}\n\n`;
  if (prefix.length + body.length <= MAX_CHUNK_CHARS) return [prefix + body];

  const paragraphs = body.split(/\n{2,}/);
  const parts: string[] = [];
  let current = "";

  for (const para of paragraphs) {
    const candidate = current ? `${current}\n\n${para}` : para;
    if (prefix.length + candidate.length > MAX_CHUNK_CHARS && current) {
      parts.push(current);
      current = para;
    } else {
      current = candidate;
    }
  }
  if (current) parts.push(current);

  // Greedy packing tends to leave a runt at the end — a 90-character tail that
  // is mostly heading and carries almost no retrievable signal, yet competes
  // for a top-k slot. Fold any undersized tail back into its predecessor and
  // accept the modest ceiling overflow; a slightly long chunk costs a few
  // tokens, an orphan chunk costs an answer.
  if (parts.length > 1) {
    const last = parts[parts.length - 1];
    if (prefix.length + last.length < MIN_CHUNK_CHARS) {
      parts[parts.length - 2] = `${parts[parts.length - 2]}\n\n${last}`;
      parts.pop();
    }
  }

  // A single paragraph over the ceiling is left intact rather than cut
  // mid-sentence — an overlong chunk beats a truncated one.
  return parts.map((part) => prefix + part);
}

async function main() {
  // `--dry-run` chunks and reports without calling the API, so chunk boundaries
  // can be reviewed before spending anything (and without a key present).
  const dryRun = process.argv.includes("--dry-run");

  if (!dryRun && !process.env.OPENAI_API_KEY) {
    console.error(
      "OPENAI_API_KEY is not set.\n" +
        "Add it to client/.env.local (gitignored), or pass --dry-run to inspect\n" +
        "chunking without calling the API.",
    );
    process.exit(1);
  }

  const sections = SOURCES.flatMap((file) => {
    const path = join(KNOWLEDGE_DIR, file);
    if (!existsSync(path)) {
      console.warn(`Skipping missing source: ${file}`);
      return [];
    }
    return splitIntoSections(readFileSync(path, "utf8"), file);
  });

  if (sections.length === 0) {
    console.error("No sections found. Run `npm run knowledge:generate` first.");
    process.exit(1);
  }

  const totalChars = sections.reduce((n, s) => n + s.text.length, 0);
  console.log(
    `Chunked ${sections.length} chunks (~${Math.round(totalChars / 4)} tokens) ` +
      `from ${SOURCES.length} sources.`,
  );

  if (dryRun) {
    console.log("\n--dry-run: no API calls, nothing written.\n");
    const widest = Math.max(...sections.map((s) => s.text.length));
    for (const s of sections) {
      console.log(`  ${String(s.text.length).padStart(5)} chars  ${s.heading}`);
    }
    console.log(
      `\nLargest chunk ${widest} chars (ceiling ${MAX_CHUNK_CHARS}).\n` +
        `Estimated embedding cost at $0.02/1M: ` +
        `$${((totalChars / 4 / 1_000_000) * 0.02).toFixed(5)}`,
    );
    return;
  }

  const openai = new OpenAI();
  const chunks: Chunk[] = [];

  for (let i = 0; i < sections.length; i += BATCH_SIZE) {
    const batch = sections.slice(i, i + BATCH_SIZE);
    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: batch.map((s) => s.text),
    });

    // The API returns an `index` per item; sort rather than trusting order.
    const ordered = [...response.data].sort((a, b) => a.index - b.index);
    ordered.forEach((item, j) => {
      chunks.push({ id: `chunk-${i + j}`, ...batch[j], embedding: item.embedding });
    });

    console.log(`  embedded ${Math.min(i + BATCH_SIZE, sections.length)}/${sections.length}`);
  }

  writeFileSync(
    OUT_PATH,
    JSON.stringify(
      {
        model: EMBEDDING_MODEL,
        dimensions: chunks[0].embedding.length,
        generatedAt: new Date().toISOString(),
        chunks,
      },
      null,
      // No pretty-printing: this file is machine-read and pretty JSON would
      // roughly double an already-large artifact.
      0,
    ),
    "utf8",
  );

  const sizeMb = (readFileSync(OUT_PATH).byteLength / 1024 / 1024).toFixed(2);
  console.log(
    `\nWrote ${chunks.length} chunks (${chunks[0].embedding.length}-dim, ${sizeMb} MB) to ${OUT_PATH}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
