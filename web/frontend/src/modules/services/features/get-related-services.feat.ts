import { apiFetch } from "@/shared/apiFetch";
import { ApiEnvelope } from "@/shared/types/api.types";
import { ApiService } from "../types/service.type";

export async function getRelatedServices(id: string) {
  const response = await apiFetch<ApiEnvelope<ApiService[]>>(
    `/api/services/${id}/related`,
  );

  return response.data ?? [];
}
