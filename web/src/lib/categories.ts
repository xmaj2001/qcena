export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  productCount: number;
}

export const mockCategories: Category[] = [
  { id: "cat-1", name: "Moda", slug: "moda", description: "Roupas, calçados e acessórios de tendência.", icon: "shirt", productCount: 198 },
  { id: "cat-2", name: "Beleza", slug: "beleza", description: "Cosméticos, perfumes e cuidados pessoais.", icon: "sparkles", productCount: 94 },
  { id: "cat-3", name: "Electrónicos", slug: "eletronicos", description: "Gadgets, periféricos de informática e áudio.", icon: "laptop", productCount: 405 },
  { id: "cat-4", name: "Acessórios", slug: "acessorios", description: "Relógios, joias e bijuterias.", icon: "watch", productCount: 207 },
];
