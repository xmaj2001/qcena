import type { ApiResponseError, ErrorResponse } from "../types/api.types";
import { ApiRequestError } from "../types/api-request-error";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
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
