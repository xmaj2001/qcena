"use client";

import { useEffect, useRef } from "react";

export function InfiniteScrollTrigger({
  onIntersect,
  enabled,
  rootMargin = "200px",
}: {
  onIntersect: () => void;
  enabled: boolean;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onIntersect(),
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, onIntersect, rootMargin]);

  return <div ref={ref} aria-hidden />;
}
