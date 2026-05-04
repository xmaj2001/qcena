import { apiFetch } from "@/shared/apiFetch";
import type { ApiService } from "../types/service.type";
import type { ApiEnvelope } from "@/shared/types/api.types";

export async function getServices(): Promise<ApiService[]> {
  const response = await apiFetch<ApiEnvelope<ApiService[]>>("/api/services");

  return response.data;
}
