import type { ApiEnvelope } from "@/shared/types/api.types";
import type { ApiService } from "../types/service.type";

import { apiFetch } from "@/shared/apiFetch";

export async function getService(id: string): Promise<ApiService | null> {
  const response = await apiFetch<ApiEnvelope<ApiService>>(
    `/api/services/${id}`,
  );

  if (!response.data) return null;

  return response.data;
}
