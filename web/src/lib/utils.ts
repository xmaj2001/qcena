import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function waLink(text: string) {
  return `https://wa.me/244950821178?text=${encodeURIComponent(text)}`;
}