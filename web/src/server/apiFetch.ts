import type { ApiResponseError, ErrorResponse } from "../types/api.types";
import { ApiRequestError } from "../types/api-request-error";

// URL do backend NestJS — usada directamente nas chamadas server-side
const BACKEND_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

// URL do BFF Next.js — usada nas chamadas client-side
const BFF_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

/**
 * apiFetch — wrapper universal para chamadas à API.
 *
 * - Server-side: chama o backend NestJS directamente (evita o loop
 *   localhost:3000 → /api/* → localhost:5000 que falha durante o build).
 *   O prefixo "/api/" é removido do path porque o backend não o usa.
 * - Client-side: chama os route handlers Next.js (BFF) em /api/*,
 *   mantendo o comportamento existente.
 */
export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  let baseUrl: string;
  let fetchUrl: string;
  let serverHeaders: Record<string, string> = {};

  if (typeof window === "undefined") {
    // ── Server-side ─────────────────────────────────────────────────────────
    baseUrl = BACKEND_URL;
    // /api/services?foo=bar  →  /services?foo=bar
    fetchUrl = url.replace(/^\/api\//, "/");

    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      serverHeaders = {
        Cookie: cookieStore.toString(),
      };
    } catch {
      // Durante o build estático o cookies() não está disponível — ignorar.
    }
  } else {
    // ── Client-side ─────────────────────────────────────────────────────────
    baseUrl = BFF_URL;
    fetchUrl = url;
  }

  const response = await fetch(`${baseUrl}${fetchUrl}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...serverHeaders,
      ...options?.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const body = (await response.json()) as ApiResponseError<ErrorResponse>;
    throw new ApiRequestError(body);
  }

  return await response.json();
}
