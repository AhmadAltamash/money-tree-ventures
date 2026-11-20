// Placeholder with the same shape as the real page, shown while kits load.
export function ProductsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Kits load ho rahe hain">
      <div className="h-11 animate-pulse rounded-lg bg-surface-raised" />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <li key={index} className="rounded-2xl border border-border bg-surface p-2">
            <div className="aspect-4/3 animate-pulse rounded-lg bg-surface-raised" />
            <div className="flex flex-col gap-2 p-3">
              <div className="h-4 w-1/3 animate-pulse rounded-lg bg-surface-raised" />
              <div className="h-6 w-3/4 animate-pulse rounded-lg bg-surface-raised" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-surface-raised" />
              <div className="h-6 w-1/4 animate-pulse rounded-lg bg-surface-raised" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
