import { faker } from "@faker-js/faker";
import type { ApiService } from "../types/service.type";
import { ServiceState } from "../types/service.type";
import { COLLECTIONS } from "../constant";

// id com auto incremento

export const generateMockService = (id: string): ApiService => ({
  id: id,
  images: Array.from({ length: 4 }).map(() => ({
    src: faker.image.url(),
    altText: faker.commerce.productName(),
  })),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: parseFloat(faker.commerce.price()),
  totalReservations: faker.number.int({ min: 0, max: 100 }),
  totalFavorites: faker.number.int({ min: 0, max: 100 }),
  topClients: Array.from({ length: 3 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
    totalReservations: faker.number.int({ min: 0, max: 100 }),
  })),
  provider: {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  },
  category: faker.helpers.arrayElement(COLLECTIONS).slug,
  tags: faker.helpers.arrayElements([
    "service",
    "beauty",
    "health",
    "spa",
    "massage",
    "facial",
    "body",
    "hair",
    "nails",
    "waxing",
  ]),
  state: faker.helpers.enumValue(ServiceState),
  totalEarnings: parseFloat(faker.commerce.price()),
});

export const generateMockServices = (count: number = 10): ApiService[] => {
  return Array.from({ length: count }).map((_, index) =>
    generateMockService((index + 1).toString()),
  );
};
