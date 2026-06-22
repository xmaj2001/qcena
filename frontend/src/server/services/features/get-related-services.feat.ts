import { apiFetch } from "@/server/apiFetch";
import type { ApiEnvelope } from "@/types/api.types";
import type { ApiService } from "../types/service.type";

export async function getRelatedServices(id: string) {
  const response = await apiFetch<ApiEnvelope<ApiService[]>>(
    `/api/services/${id}/related`,
  );

  return response.data ?? [];
}
