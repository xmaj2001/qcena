import { apiFetch } from "@/server/apiFetch";
import type { ApiEnvelope, ApiCursorEnvelope } from "@/types/api.types";
import type { ApiService } from "../types/service.type";

export async function getFavoritesServices(): Promise<ApiService[]> {
  const response = await apiFetch<ApiEnvelope<ApiService[]>>(
    "/api/services/favorites",
  );

  return response.data;
}
