"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { siteInfo } from "@/data/site";

/**
 * Minimal markdown renderer for assistant messages.
 *
 * The chatbot answers in markdown (lists of roles, links to pages, the odd bold
 * label), and the transcript used to print that source verbatim. Rather than
 * pull in a full markdown pipeline for the handful of constructs a grounded
 * support answer actually uses, this parses the subset we ask the model for:
 *
 *   blocks   headings (#..###), unordered lists, ordered lists, paragraphs
 *   inline   **bold**, *italic*, `code`, [text](url), bare URLs and emails
 *
 * Everything is built as React elements — no `dangerouslySetInnerHTML` — so
 * model output can never inject markup. Anything unrecognised falls through as
 * plain text, which keeps partially-streamed messages readable mid-token.
 */

/* ---- Inline ---------------------------------------------------------- */

/** Ordered by precedence; the first alternative to match at a position wins. */
const INLINE = new RegExp(
  [
    "`([^`]+)`", // code
    "\\*\\*([^*]+)\\*\\*", // bold
    "\\*([^*\\n]+)\\*", // italic
    "\\[([^\\]]+)\\]\\(([^)\\s]+)\\)", // link
    "(https?://[^\\s<>()]+)", // bare url
    "([\\w.+-]+@[\\w-]+\\.[\\w.]+)", // email
  ].join("|"),
  "g",
);

const siteHost = (() => {
  try {
    return new URL(siteInfo.url).host.replace(/^www\./, "");
  } catch {
    return "";
  }
})();

/**
 * Internal links stay in the tab and drop the origin, so a retrieved
 * "https://www.technovateai.com/careers/x" behaves like site navigation.
 * External destinations open in a new tab with the usual rel guard.
 */
function linkProps(href: string): { href: string; external: boolean } {
  if (href.startsWith("/") || href.startsWith("#")) return { href, external: false };
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return { href, external: false };
  try {
    const url = new URL(href);
    if (siteHost && url.host.replace(/^www\./, "") === siteHost) {
      return { href: `${url.pathname}${url.search}${url.hash}`, external: false };
    }
  } catch {
    /* not an absolute URL — treat as-is */
  }
  return { href, external: true };
}

function Anchor({ href, children }: { href: string; children: React.ReactNode }) {
  const { href: resolved, external } = linkProps(href);
  return (
    <a
      href={resolved}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
    >
      {children}
    </a>
  );
}

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  INLINE.lastIndex = 0;
  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${match.index}`;
    const [, code, bold, italic, linkText, linkHref, url, email] = match;

    if (code !== undefined) {
      nodes.push(
        <code key={key} className="rounded bg-dark/5 px-1 py-0.5 font-mono text-[0.85em]">
          {code}
        </code>,
      );
    } else if (bold !== undefined) {
      nodes.push(
        <strong key={key} className="font-semibold text-dark">
          {bold}
        </strong>,
      );
    } else if (italic !== undefined) {
      nodes.push(<em key={key}>{italic}</em>);
    } else if (linkText !== undefined) {
      nodes.push(
        <Anchor key={key} href={linkHref}>
          {linkText}
        </Anchor>,
      );
    } else if (url !== undefined) {
      nodes.push(
        <Anchor key={key} href={url}>
          {url.replace(/^https?:\/\/(www\.)?/, "")}
        </Anchor>,
      );
    } else if (email !== undefined) {
      nodes.push(
        <Anchor key={key} href={`mailto:${email}`}>
          {email}
        </Anchor>,
      );
    }

    last = match.index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/* ---- Blocks ---------------------------------------------------------- */

type Block =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] };

const BULLET = /^\s*[-*•]\s+(.*)$/;
const NUMBERED = /^\s*\d+[.)]\s+(.*)$/;
const HEADING = /^\s*#{1,4}\s+(.*)$/;

function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push({ kind: "list", ...list });
      list = null;
    }
  };

  for (const line of source.split("\n")) {
    const bullet = line.match(BULLET);
    const numbered = !bullet ? line.match(NUMBERED) : null;
    const heading = !bullet && !numbered ? line.match(HEADING) : null;

    if (bullet || numbered) {
      flushParagraph();
      const ordered = Boolean(numbered);
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }

    // A blank line ends whatever block is open; a continuation line inside an
    // open list appends to its last item so wrapped bullets stay together.
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ kind: "heading", text: heading[1] });
      continue;
    }
    if (list) {
      list.items[list.items.length - 1] += ` ${line.trim()}`;
      continue;
    }
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  return blocks;
}

/* ---- Component -------------------------------------------------------- */

export function Markdown({ content, className }: { content: string; className?: string }) {
  const blocks = React.useMemo(() => parseBlocks(content), [content]);

  return (
    <div className={cn("space-y-2 leading-relaxed [&>*:first-child]:mt-0", className)}>
      {blocks.map((block, i) => {
        if (block.kind === "heading") {
          return (
            <p key={i} className="font-display text-small-14 font-semibold text-dark">
              {renderInline(block.text, `h${i}`)}
            </p>
          );
        }
        if (block.kind === "paragraph") {
          return <p key={i}>{renderInline(block.text, `p${i}`)}</p>;
        }
        const List = block.ordered ? "ol" : "ul";
        return (
          <List
            key={i}
            className={cn(
              "space-y-1.5 ps-4",
              block.ordered ? "list-decimal" : "list-disc",
              "marker:text-dark-400",
            )}
          >
            {block.items.map((item, j) => (
              <li key={j} className="ps-0.5">
                {renderInline(item, `l${i}-${j}`)}
              </li>
            ))}
          </List>
        );
      })}
    </div>
  );
}
