/**
 * Retrieval for the public support chatbot.
 *
 * Server-only. The vector store is a plain JSON file loaded once into module
 * scope and scanned exhaustively — at a few dozen chunks a brute-force cosine
 * scan is microseconds, so an index or a vector database would add operational
 * surface for no measurable gain. Revisit if the corpus passes a few thousand
 * chunks.
 *
 * Cosine is computed properly rather than as a bare dot product: OpenAI returns
 * unit vectors at full width, but truncating via the `dimensions` parameter
 * leaves them un-normalised, so a dot-product shortcut would silently skew
 * scores for anyone who sets OPENAI_EMBEDDING_DIMENSIONS.
 */

import "server-only";
import OpenAI from "openai";

import store from "@/data/knowledge/embeddings.json";

export type RetrievedChunk = {
  heading: string;
  source: string;
  text: string;
  score: number;
};

type StoredChunk = {
  id: string;
  heading: string;
  source: string;
  text: string;
  embedding: number[];
};

const chunks = store.chunks as StoredChunk[];

export const EMBEDDING_MODEL =
  process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small";

/** How many chunks to put in front of the model. */
const TOP_K = Number(process.env.RAG_TOP_K ?? 6);

/**
 * Minimum cosine score for a chunk to be included.
 *
 * This is the guard against the classic RAG failure: an off-topic question
 * ("what's the weather?") still produces a nearest neighbour, just a bad one.
 * Below this floor we return nothing, and the route tells the model it has no
 * context — which makes it decline rather than confabulate from noise.
 *
 * 0.25 suits text-embedding-3-small, whose scores for genuinely related text
 * on this corpus sit around 0.35-0.6. Retune if you change embedding model:
 * run `npm run rag:eval` and look at the score column.
 */
const SCORE_FLOOR = Number(process.env.RAG_SCORE_FLOOR ?? 0.25);

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dot / denominator;
}

let client: OpenAI | null = null;
function getClient(): OpenAI {
  // Lazily constructed so importing this module doesn't throw at build time
  // when OPENAI_API_KEY is absent (e.g. during `next build` in CI).
  client ??= new OpenAI();
  return client;
}

/** Embeds a single query string. */
async function embedQuery(query: string): Promise<number[]> {
  const response = await getClient().embeddings.create({
    model: EMBEDDING_MODEL,
    input: query,
  });
  return response.data[0].embedding;
}

/**
 * Returns the chunks most similar to `query`, best first, filtered by
 * SCORE_FLOOR. An empty array means "nothing in the knowledge base is relevant"
 * — callers must treat that as a real answer, not an error.
 */
export async function retrieve(query: string): Promise<RetrievedChunk[]> {
  const queryEmbedding = await embedQuery(query);

  return chunks
    .map((chunk) => ({
      heading: chunk.heading,
      source: chunk.source,
      text: chunk.text,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .filter((chunk) => chunk.score >= SCORE_FLOOR)
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K);
}

/** Formats retrieved chunks for injection into the prompt. */
export function formatContext(retrieved: RetrievedChunk[]): string {
  if (retrieved.length === 0) return "";
  return retrieved
    .map((chunk, i) => `[${i + 1}] ${chunk.text}`)
    .join("\n\n---\n\n");
}

export const storeMeta = {
  model: store.model as string,
  dimensions: store.dimensions as number,
  generatedAt: store.generatedAt as string,
  chunkCount: chunks.length,
};
