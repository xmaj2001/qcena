import { APIProductDetails } from "@/features/products";
import { formatKz } from "./utils";
import { env } from "@/env";

export const WHATSAPP_NUMBER = "244950821178"; // Número sem o sinal de +

export function buildWhatsAppUrl(
  product: APIProductDetails,
  lang: string,
  dynamicNumber?: string,
) {
  const number = dynamicNumber || WHATSAPP_NUMBER;
  const baseUrl = env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const productLink = `${baseUrl}/${lang}/products/${product.slug || product.id}`;

  const text = `Olá, tenho interesse no produto *${product.name}* por ${formatKz(product.price)}.\n\nVeja aqui: ${productLink}`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function buildGeneralWhatsAppUrl(dynamicNumber?: string) {
  const number = dynamicNumber || WHATSAPP_NUMBER;
  const text = `Olá, gostaria de obter mais informações sobre os produtos disponíveis.`;
  
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}