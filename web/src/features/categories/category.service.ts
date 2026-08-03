import { apiFetch } from "@/features/core/api-fetch";
import { apiFetchServer } from "@/features/core/api-fetch.server";
import type { ApiEnvelope } from "@/features/core/api.types";
import type { Category } from "./types";

export const categoryService = {
  async getCategoriesServer(): Promise<Category[]> {
    const res = await apiFetchServer<ApiEnvelope<Category[]>>("categories");
    return res.data;
  },

  async getCategories(): Promise<Category[]> {
    const res = await apiFetch<ApiEnvelope<Category[]>>("categories");
    return res.data;
  },
};