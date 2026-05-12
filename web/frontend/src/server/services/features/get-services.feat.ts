import { apiFetch } from "@/server/apiFetch";
import type { ApiEnvelope } from "@/types/api.types";
import type { ApiService } from "../types/service.type";

export async function getServices(): Promise<ApiService[]> {
  const response = await apiFetch<ApiEnvelope<ApiService[]>>("/api/services");

  return response.data;
}
