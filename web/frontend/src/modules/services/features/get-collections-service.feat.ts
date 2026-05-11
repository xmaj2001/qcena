import { apiFetch } from "@/shared/apiFetch";
import { ApiEnvelope } from "@/shared/types/api.types";
import type { ServiceCollection } from "../types/service.type";

export async function getCollectionsServices(): Promise<
  ServiceCollectionFilter[]
> {
  const response = await apiFetch<ApiEnvelope<ServiceCollection[]>>(
    `/api/services/collections`,
  );

  return generateCollections(response.data ?? []);
}

export type ServiceCollectionFilter = Pick<ServiceCollection, "title"> & {
  slug: string;
  path: string;
};

function generateCollections(collections: ServiceCollection[]) {
  const baseFilters: ServiceCollectionFilter[] = [
    { title: "Todos", slug: "all", path: "/search" },
  ];

  const collectionFilters = collections.map((c) => ({
    ...c,
    path: `/search/${c.slug}`,
  }));

  return [...baseFilters, ...collectionFilters];
}
