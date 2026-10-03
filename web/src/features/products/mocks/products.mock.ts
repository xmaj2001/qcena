import { faker } from "@faker-js/faker";
import type { Product } from "../types";

faker.seed(20261003);

const names = [
  "PC Gamer Extreme RTX 4090",
  "Setup Modding Custom RGB Edition",
  "Workstation NitroPC Pro Max",
  "PC Creator Studio Ultra",
  "Gaming Setup Black Edition",
  "NitroPC Performance X",
  "Creator Station Pro",
  "Gaming Beast RGB",
  "NitroPC Compact",
  "Studio Workstation Max",
  "Performance Build Ultra",
  "Elite Gaming Edition",
];

export function createMockProduct(index: number): Product {
  const name = names[index % names.length];
  const price = faker.number.int({ min: 250000, max: 950000, multipleOf: 10000 });

  return {
    id: faker.string.uuid(),
    name,
    slug: faker.helpers.slugify(name).toLowerCase(),
    banner: "/demo.png",
    video: "",
    images: ["/demo.png"],
    price,
    oldPrice: price + faker.number.int({ min: 50000, max: 180000, multipleOf: 10000 }),
    stock: faker.number.int({ min: 0, max: 12 }),
    badge: faker.helpers.arrayElement(["Novo", "Destaque", "Oferta", "Popular"]),
    category: faker.helpers.arrayElement(["Gaming", "Workstation", "Setup", "PC"]),
    rating: Number(faker.number.float({ min: 4, max: 5, fractionDigits: 1 }).toFixed(1)),
    reviews: faker.number.int({ min: 4, max: 180 }),
    tags: faker.helpers.arrayElements(["gaming", "rgb", "performance", "premium"], { min: 1, max: 3 }),
    description: faker.commerce.productDescription(),
    specs: [
      { label: "Processador", value: "AMD Ryzen 7" },
      { label: "Memória", value: "32 GB RAM" },
      { label: "Armazenamento", value: "1 TB SSD" },
    ],
  };
}

export const mockProducts = Array.from({ length: 12 }, (_, index) => createMockProduct(index));

export const mockHomeProducts = {
  recommended: mockProducts.slice(0, 6),
  newProducts: mockProducts.slice(6, 10),
  comingSoon: mockProducts.slice(10, 12),
};
