import { Product } from "@/features/products";
import { formatPrice } from "./utils";

export const WHATSAPP_NUMBER = "244950821178"; // Número sem o sinal de +

export function buildWhatsAppUrl(product: Product, dynamicNumber?: string) {
  const number = dynamicNumber || WHATSAPP_NUMBER;
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const productLink = `${baseUrl}/product/${product.slug || product.id}`;
  
  const text = `Olá, tenho interesse no produto *${product.name}* por ${formatPrice(product.price)}.\n\nVeja aqui: ${productLink}`;
  
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function buildGeneralWhatsAppUrl(dynamicNumber?: string) {
  const number = dynamicNumber || WHATSAPP_NUMBER;
  const text = `Olá, gostaria de obter mais informações sobre os produtos disponíveis.`;
  
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}