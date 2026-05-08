import type { ApiEnvelope } from "@/shared/types/api.types";
import type { ApiService } from "../types/service.type";

import { apiFetch } from "@/shared/apiFetch";

export async function getServices(): Promise<ApiService[]> {
  const response = await apiFetch<ApiEnvelope<ApiService[]>>("/api/services");

  return response.data;
}
