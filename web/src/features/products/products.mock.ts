import { fakerPT_BR as faker } from "@faker-js/faker";
import type { Product } from "./types";

// Mapeamento de Macro-Categorias com suas respetivas Tags
const CATEGORIES_WITH_TAGS = {
  moda: ["tenis", "bolsas", "pastas"],
  beleza: ["cremes", "lipgloss"],
  eletronicos: ["mouses", "teclados", "suporte-telefone", "auriculares"],
  acessorios: ["anel", "pulseiras", "brinco", "colar", "relogio"],
} as const;

type CategorySlug = keyof typeof CATEGORIES_WITH_TAGS;

const CATEGORY_SLUGS = Object.keys(CATEGORIES_WITH_TAGS) as CategorySlug[];
const BADGES = ["Destaque", "Promoção", "Mais Vendido", "Novo", "Super Oferta"];

export function generateMockProduct(overrides?: Partial<Product>): Product {
  const price = faker.number.int({ min: 50000, max: 3000000 });
  const discountPercent = faker.number.int({ min: 10, max: 35 });
  const oldPrice = Math.round(price * (1 + discountPercent / 100));

  // Seleciona uma categoria principal sorteada
  const selectedCategory = faker.helpers.arrayElement(CATEGORY_SLUGS);

  // Extrai as tags disponíveis apenas para essa categoria e sorteia de 1 a 2 tags
  const availableTags = CATEGORIES_WITH_TAGS[selectedCategory];
  const selectedTags = faker.helpers.arrayElements(availableTags, { min: 1, max: 2 });

  return {
    id: `prod-${faker.string.nanoid(6)}`,
    name: faker.commerce.productName(),
    banner: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    ],
    price,
    oldPrice,
    stock: faker.number.int({ min: 0, max: 20 }),
    badge: faker.helpers.arrayElement(BADGES),
    category: selectedCategory,
    tags: selectedTags,
    rating: Number(faker.number.float({ min: 4.0, max: 5.0, fractionDigits: 1 })),
    reviews: faker.number.int({ min: 5, max: 150 }),
    description: faker.commerce.productDescription(),
    specs: [
      { label: "Marca", value: faker.company.name() },
      { label: "Garantia", value: "12 Meses" },
      { label: "Condição", value: "Novo" },
    ],
    ...overrides,
  };
}

export function generateMockProducts(count: number): Product[] {
  return Array.from({ length: count }, () => generateMockProduct());
}

export const STATIC_MACBOOK_PRO: Product = {
  id: "prod-101",
  name: "MacBook Pro M3 Max 36GB RAM 1TB SSD",
  banner: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
  video: "https://www.w3schools.com/html/mov_bbb.mp4",
  images: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
  ],
  price: 2500000,
  oldPrice: 2800000,
  stock: 5,
  badge: "Destaque",
  category: "eletronicos",
  tags: ["teclados", "mouses"],
  rating: 4.9,
  reviews: 28,
  description:
    "O portátil mais avançado da Apple para profissionais. Com o processador M3 Max, 36GB de RAM e 1TB de SSD. Perfeito para edição de vídeo 4K, modelagem 3D e desenvolvimento de software complexo.",
  specs: [
    { label: "Processador", value: "M3 Max" },
    { label: "RAM", value: "36GB" },
    { label: "Armazenamento", value: "1TB SSD" },
    { label: "Ecrã", value: '16.2" Liquid Retina XDR' },
    { label: "Bateria", value: "Até 22 horas" },
    { label: "Sistema", value: "macOS Sonoma" },
  ],
};