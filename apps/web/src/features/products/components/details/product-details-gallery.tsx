"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductDetailsGalleryProps {
  gallery: string[];
  productName: string;
  labels: {
    noImage: string;
    thumbnail: string;
  };
}

export const ProductDetailsGallery = ({
  gallery,
  productName,
  labels,
}: ProductDetailsGalleryProps) => {
  const [selectedImg, setSelectedImg] = useState(0);

  if (!gallery || gallery.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-xl border bg-muted text-sm text-muted-foreground">
        {labels.noImage}
      </div>
    );
  }

  const current = gallery[selectedImg] ?? gallery[0];

  return (
    <div className="flex flex-col gap-3">
      {/* Imagem principal */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
        <Image
          src={current}
          alt={productName}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain"
        />
      </div>

      {/* Miniaturas: rolam na horizontal se forem muitas */}
      {gallery.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {gallery.map((imgUrl, index) => (
            <button
              key={`${index}-${imgUrl.slice(-24)}`}
              type="button"
              onClick={() => setSelectedImg(index)}
              aria-label={`${labels.thumbnail} ${index + 1}`}
              aria-current={index === selectedImg}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden rounded-lg border-2 transition-[opacity,border-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                index === selectedImg
                  ? "border-primary opacity-100 ring-2 ring-primary/20"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={imgUrl}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
