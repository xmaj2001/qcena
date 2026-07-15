"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const waLink = "https://wa.me/244900000000?text=Olá!%20Gostaria%20de%20saber%20mais.";

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-[90px] lg:bottom-6 right-4 lg:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
      aria-label="Fale conosco no WhatsApp"
      style={{
        boxShadow: "0 8px 24px rgba(34, 197, 94, 0.4)",
      }}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
