import { apiFetch } from "@/server/apiFetch";
import type { ApiEnvelope } from "@/types/api.types";

export async function getCollectionsServices(): Promise<
  ServiceCollectionFilter[]
> {
  const response = await apiFetch<ApiEnvelope<string[]>>(
    `/api/services/collections`,
  );

  return generateCollections(response.data ?? []);
}

export type ServiceCollectionFilter = {
  title: string;
  slug: string;
  path: string;
};

function generateCollections(collections: string[]) {
  const baseFilters: ServiceCollectionFilter[] = [
    { title: "Todos", slug: "all", path: "/search" },
  ];

  const collectionFilters: ServiceCollectionFilter[] = collections.map((c) => ({
    title: c,
    slug: c,
    path: `/search/${c}`,
  }));

  return [...baseFilters, ...collectionFilters];
}
