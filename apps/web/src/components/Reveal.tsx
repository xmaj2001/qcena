"use client";

import {
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export function useInView<T extends Element>(
  options?: IntersectionObserverInit & { once?: boolean },
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const once = options?.once ?? true;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.15, ...options },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

const variantClass = {
  rise: "reveal",
  wipe: "reveal-wipe",
  mask: "reveal-mask",
} as const;

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "rise",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: keyof typeof variantClass;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={cn(variantClass[variant], inView && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Headline whose lines slide up from behind a straight edge, one after another. */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: (i: number) => string | undefined;
  delay?: number;
  as?: ElementType;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <Reveal
          key={i}
          variant="mask"
          delay={delay + i * 110}
          as="span"
          className="block"
        >
          <span className={lineClassName?.(i)}>{line}</span>
        </Reveal>
      ))}
    </Tag>
  );
}
