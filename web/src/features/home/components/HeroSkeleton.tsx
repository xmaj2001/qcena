export function HeroSkeleton() {
  return (
    <section className="min-h-screen p-2 sm:h-screen sm:max-h-screen" aria-label="A carregar destaque">
      <div className="relative flex min-h-[calc(100vh-1rem)] flex-col justify-between overflow-hidden rounded-[2rem] border bg-muted/30 p-4 sm:h-full sm:p-6 md:p-10">
        <div className="flex items-center justify-between">
          <div className="h-10 w-28 animate-pulse rounded-full bg-muted" />
          <div className="hidden h-10 w-80 animate-pulse rounded-full bg-muted lg:block" />
          <div className="flex gap-2">
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 lg:flex-row lg:justify-between">
          <div className="w-full space-y-4 lg:w-[42%]">
            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            <div className="h-16 w-full animate-pulse rounded-2xl bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-[min(42vh,360px)] w-[min(70vw,360px)] animate-pulse rounded-[2rem] bg-muted" />
          <div className="hidden gap-3 lg:flex lg:flex-col">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-16 w-16 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-14 w-32 animate-pulse rounded-2xl bg-muted" />
          <div className="h-12 w-36 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </section>
  );
}
