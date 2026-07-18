"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export function ProductGallery({ p }: { p: any }) {
  const [active, setActive] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
        {showVideo && p.video ? (
          <video src={p.video} controls autoPlay className="h-full w-full object-cover" />
        ) : (
          <img
            key={active}
            src={p.images[active]} alt={p.name}
            className="h-full w-full animate-fade-in object-cover"
          />
        )}
        {p.badge && !showVideo && (
          <span className="absolute left-4 top-4 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground shadow-soft">
            {p.badge}
          </span>
        )}
        {p.video && !showVideo && (
          <button
            onClick={() => setShowVideo(true)}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-glow"
          >
            <Play className="h-4 w-4 fill-current" /> Ver vídeo
          </button>
        )}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {p.images.map((img: string, i: number) => (
          <button
            key={i}
            onClick={() => { setActive(i); setShowVideo(false); }}
            className={`aspect-square overflow-hidden rounded-xl border-2 transition ${
              active === i && !showVideo ? "border-primary shadow-soft" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
        {p.video && (
          <button
            onClick={() => setShowVideo(true)}
            className={`relative grid aspect-square place-items-center overflow-hidden rounded-xl border-2 bg-black text-white transition ${
              showVideo ? "border-primary" : "border-transparent opacity-90"
            }`}
          >
            <Play className="h-6 w-6 fill-current" />
            <span className="absolute bottom-1 text-[9px] font-bold">VÍDEO</span>
          </button>
        )}
      </div>
    </div>
  );
}
