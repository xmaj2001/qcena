import type { ApiResponseError, ErrorResponse } from "../types/api.types";
import { ApiRequestError } from "../types/api-request-error";
// import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  let serverHeaders = {};

  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();

      serverHeaders = {
        Cookie: cookieStore.toString(),
      };
    } catch (e) {
      console.error("Erro ao ler cookies no servidor:", e);
    }
  }
  const response = await fetch(`${API_URL}${url}`, {
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
