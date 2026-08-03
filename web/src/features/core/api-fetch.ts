import { ApiRequestError } from "./api-request-error";
import type { ApiResponseError, ErrorResponse } from "./api.types";

const API_URL = process.env.NEXT_PUBLIC_URL || "";

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    console.log("API_URL", API_URL)
    const response = await fetch(`${API_URL}/api/${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      credentials: "include", // Garante o envio automático de cookies de sessão/BetterAuth
    });

    if (!response.ok) {
      const body = (await response.json()) as ApiResponseError<ErrorResponse>;
      throw new ApiRequestError(body);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiRequestError) {
      throw error;
    }
    // Trata falhas físicas de rede (CORS, sem internet, DNS)
    throw new Error(`Falha na comunicação com o BFF: ${error instanceof Error ? error.message : "Erro de rede"}`);
  }
}