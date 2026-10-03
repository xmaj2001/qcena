import { Suspense } from "react";
import { HeroContent } from "./HeroContent";
import { HeroSkeleton } from "./HeroSkeleton";

export function Hero() {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <HeroContent />
    </Suspense>
  );
}
