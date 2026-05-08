export type ServiceCategory = {
  label: string;
  slug: string;
};

export type SortOption = {
  label: string;
  value: "relevance" | "trending" | "latest" | "price-asc" | "price-desc";
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { label: "Todos", slug: "all" },
  { label: "Beleza", slug: "beleza" },
  { label: "Fitness", slug: "fitness" },
  { label: "Saúde", slug: "saude" },
  { label: "Reparações", slug: "reparacoes" },
  { label: "Educação", slug: "educacao" },
  { label: "Fotografia", slug: "fotografia" },
  { label: "Limpeza", slug: "limpeza" },
  { label: "Consultoria", slug: "consultoria" },
  { label: "Eventos", slug: "eventos" },
];

export const SORT_OPTIONS: SortOption[] = [
  { label: "Relevância", value: "relevance" },
  { label: "Trending", value: "trending" },
  { label: "Mais recentes", value: "latest" },
  { label: "Preço: Baixo a alto", value: "price-asc" },
  { label: "Preço: Alto a baixo", value: "price-desc" },
];
