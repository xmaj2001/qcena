import { apiFetch } from "@/server/apiFetch";
import type { ApiEnvelope, ApiCursorEnvelope } from "@/types/api.types";
import type { ApiService } from "../types/service.type";

export interface GetServicesFilters {
  cursor?: string;
  limit?: number;
  status?: "ENABLED" | "DISABLED";
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export async function getServices(
  filters?: GetServicesFilters,
): Promise<ApiEnvelope<ApiCursorEnvelope<ApiService>>> {
  const queryParams = new URLSearchParams();

  if (filters) {
    if (filters.cursor) queryParams.append("cursor", filters.cursor);
    if (filters.limit !== undefined) {
      queryParams.append("limit", filters.limit.toString());
    }
    if (filters.status) queryParams.append("status", filters.status);
    if (filters.category) queryParams.append("category", filters.category);
    if (filters.minPrice !== undefined) {
      queryParams.append("minPrice", filters.minPrice.toString());
    }
    if (filters.maxPrice !== undefined) {
      queryParams.append("maxPrice", filters.maxPrice.toString());
    }
    if (filters.search) queryParams.append("search", filters.search);
  }

  const queryString = queryParams.toString();
  const url = `/api/services${queryString ? `?${queryString}` : ""}`;

  const response =
    await apiFetch<ApiEnvelope<ApiCursorEnvelope<ApiService>>>(url);

  return response;
}
