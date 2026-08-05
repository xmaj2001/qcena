"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { Product } from "@/features/products";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  product: Product;
  whatsappNumber?: string;
  className?: string;
  lang: string;
  label?: string;
}

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

export function WhatsAppButton({
  product,
  whatsappNumber,
  className = "",
  label = "Tenho interesse",
  lang,
}: WhatsAppButtonProps) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  const link = buildWhatsAppUrl(product, lang, whatsappNumber);

  const handleClick = (e: React.MouseEvent) => {
    if (mobile) return;
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/80 ${className}`}
      >
        <MessageCircle className="h-4 w-4" />
        {label}
      </a>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              Fale connosco no WhatsApp
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Escaneie o QR Code com o seu telemóvel para encomendar ou
              consultar sobre{" "}
              <span className="font-medium text-gray-900">{product.name}</span>.
            </p>
            <div className="mt-6 flex justify-center rounded-2xl bg-gray-50 p-6">
              <QRCodeSVG value={link} size={220} level="M" />
            </div>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1ebe57]"
            >
              <Image
                src="/whatsapp.svg"
                alt="WhatsApp"
                width={25}
                height={25}
              />
              Abrir WhatsApp Web
            </a>
          </div>
        </div>
      )}
    </>
  );
}
