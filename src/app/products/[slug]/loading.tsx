import { Container } from "@/components/ui/Container";

export default function ProductLoading() {
  return (
    <section className="pt-24 pb-20" aria-busy="true" aria-label="Kit load ho raha hai">
      <Container>
        <div className="h-6 w-32 animate-pulse rounded-lg bg-surface-raised" />
        <div className="mt-6 grid gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="h-12 w-3/4 animate-pulse rounded-lg bg-surface-raised" />
            <div className="h-6 w-full animate-pulse rounded-lg bg-surface-raised" />
            <div className="aspect-video animate-pulse rounded-lg bg-surface-raised" />
          </div>
          <div className="h-64 animate-pulse rounded-2xl bg-surface-raised" />
        </div>
      </Container>
    </section>
  );
}
