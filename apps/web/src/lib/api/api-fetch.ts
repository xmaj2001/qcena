// import { getSessionCookies } from "@/features/auth/queries";
import type { ApiEnvelope, ApiResponseError, ErrorResponse } from "./types";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://localhost:5000";

export async function apiFetch<T>(
  endpoint: string,
  version: string = "v1",
  options?: RequestInit,
): Promise<ApiEnvelope<T>> {
  // const cookie = await getSessionCookies();
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      // Cookie: cookie,
    },
  };
  const url = `${API}/${version}${endpoint}`;
  const res = await fetch(url, { ...defaultOptions, ...options });
  if (!res.ok) {
    const data: ApiResponseError<ErrorResponse> = await res.json();
    console.error(`API fetch failed for ${url}: ${res.statusText}`, data);
    throw new Error(`API fetch failed for ${url}: ${res.statusText}`);
  }
  return res.json();
}

export async function apiFetchBetter<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiEnvelope<T>> {
  // const cookie = await getSessionCookies();
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      // Cookie: cookie,
    },
  };
  const url = `${API}/${endpoint}`;
  const res = await fetch(url, { ...defaultOptions, ...options });
  if (!res.ok) {
    const data: ApiResponseError<ErrorResponse> = await res.json();
    console.error(`API fetch failed for ${url}: ${res.statusText}`, data);
    throw new Error(`API fetch failed for ${url}: ${res.statusText}`);
  }
  return res.json();
}
