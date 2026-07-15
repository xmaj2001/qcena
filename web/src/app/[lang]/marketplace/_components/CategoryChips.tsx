"use client";

import { useState } from "react";

const categories = [
  "Todas categorias",
  "Ofertas",
  "Design",
  "Dev",
  "Marketing",
  "Vídeo",
  "Consultoria",
  "Redação",
  "Áudio",
];

export function CategoryChips() {
  const [active, setActive] = useState("Design");

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2 rounded-full bg-white/70 p-2 shadow-md backdrop-blur overflow-x-auto whitespace-nowrap scrollbar-none">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => setActive(c)}
          className="rounded-full px-4 py-1.5 text-sm font-medium transition-all active:scale-95"
          style={
            active === c
              ? {
                  background: "var(--brand)",
                  color: "white",
                }
              : { color: "hsl(var(--foreground))" }
          }
        >
          {c}
        </button>
      ))}
    </div>
  );
}