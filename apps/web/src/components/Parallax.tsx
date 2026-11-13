"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/*
 * One shared scroll/rAF loop drives every parallax layer, writing transforms
 * straight to the DOM so scrolling never re-renders React.
 */
type Layer = (vh: number) => void;
const layers = new Set<Layer>();
let ticking = false;
let bound = false;

function run() {
  ticking = false;
  const vh = window.innerHeight;
  layers.forEach((fn) => fn(vh));
}
function request() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(run);
  }
}
function subscribe(fn: Layer) {
  layers.add(fn);
  if (!bound) {
    bound = true;
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }
  request();
  return () => {
    layers.delete(fn);
  };
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Moves its content relative to the viewport centre.
 * speed > 0 drifts against the scroll (feels further away), < 0 moves with it.
 */
export function Parallax({
  children,
  speed = 0.15,
  axis = "y",
  className,
  innerClassName,
  scale,
}: {
  children: ReactNode;
  speed?: number;
  axis?: "x" | "y";
  className?: string;
  innerClassName?: string;
  scale?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    return subscribe((vh) => {
      const o = outer.current;
      const el = inner.current;
      if (!o || !el) return;
      const r = o.getBoundingClientRect();
      if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return;
      const delta = (r.top + r.height / 2 - vh / 2) * speed;
      const t =
        axis === "y"
          ? `translate3d(0, ${delta}px, 0)`
          : `translate3d(${delta}px, 0, 0)`;
      el.style.transform = scale ? `${t} scale(${scale})` : t;
    });
  }, [speed, axis, scale]);

  return (
    <div ref={outer} className={className}>
      <div
        ref={inner}
        data-parallax
        className={cn("h-full w-full", innerClassName)}
        style={scale ? { transform: `scale(${scale})` } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

/** Calls `fn` with the page scroll position on every frame the page scrolls. */
export function useScrollFrame(fn: (scrollY: number, vh: number) => void) {
  const saved = useRef(fn);
  saved.current = fn;
  useEffect(() => {
    if (reducedMotion()) return;
    return subscribe((vh) => saved.current(window.scrollY, vh));
  }, []);
}
