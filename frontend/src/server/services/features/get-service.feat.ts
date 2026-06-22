import { apiFetch } from "@/server/apiFetch";
import type { ApiEnvelope } from "@/types/api.types";
import type { ApiService } from "../types/service.type";

export async function getService(id: string): Promise<ApiService | null> {
  const response = await apiFetch<ApiEnvelope<ApiService>>(
    `/api/services/${id}`,
  );

  if (!response.data) return null;

  return response.data;
}
