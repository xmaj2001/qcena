"use client";

import { waLink } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {

  return (
    <a
      href={waLink("")}
      target="_blank"
      rel="noreferrer"
      className="fixed shadow-primary/20 bottom-22.5 lg:bottom-6 right-4 lg:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
