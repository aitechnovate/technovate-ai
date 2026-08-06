import { Container } from "@/components/ui/Container";

/**
 * Route-level loading skeleton for every page in the marketing group.
 *
 * Next streams this instantly on navigation while the target segment resolves,
 * so a click always produces visible feedback in the same frame instead of
 * leaving the previous page on screen. The header, footer, and announcement bar
 * come from the group layout and stay mounted throughout.
 */
export default function MarketingLoading() {
  return (
    <div className="py-20 lg:py-28" role="status" aria-label="Loading page">
      <Container>
        <div className="max-w-3xl space-y-4">
          <div className="shimmer h-6 w-28 rounded-full" />
          <div className="shimmer h-12 w-full rounded-lg" />
          <div className="shimmer h-12 w-4/5 rounded-lg" />
          <div className="shimmer mt-6 h-4 w-full rounded" />
          <div className="shimmer h-4 w-11/12 rounded" />
          <div className="shimmer h-4 w-9/12 rounded" />
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-dark/10 p-6 sm:p-8"
            >
              <div className="shimmer size-12 rounded-md" />
              <div className="shimmer mt-5 h-6 w-3/4 rounded" />
              <div className="shimmer mt-3 h-4 w-full rounded" />
              <div className="shimmer mt-2 h-4 w-5/6 rounded" />
            </div>
          ))}
        </div>
      </Container>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
