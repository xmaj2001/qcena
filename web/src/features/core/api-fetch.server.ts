import { ApiRequestError } from "./api-request-error";
import type { ApiResponseError, ErrorResponse } from "./api.types";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001"; // Porta externa da API NestJS

export async function apiFetchServer<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  let serverHeaders = {};

  try {
    // Import dinâmico para garantir que este código nunca quebra se compilado erroneamente no cliente
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    serverHeaders = {
      cookie: cookieStore.toString(), // Repassa os cookies do utilizador autenticado
    };
  } catch (e) {
    console.error(
      "[apiFetchServer] Erro ao ler cookies no ambiente de servidor:",
      e,
    );
  }

  try {
    const response = await fetch(`${BACKEND_URL}/${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...serverHeaders,
        ...options?.headers,
      },
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
    throw new Error(
      `Falha no fetch interno de servidor para o NestJS: ${error instanceof Error ? error.message : "Erro"}`,
    );
  }
}
