import type { ApiEnvelope } from "./api.types";

export async function apiFetchServer<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  const body = (await response.json()) as ApiEnvelope<T>;
  if (!response.ok || !body.success) throw new Error("Não foi possível obter os dados.");
  return body.data;
}
