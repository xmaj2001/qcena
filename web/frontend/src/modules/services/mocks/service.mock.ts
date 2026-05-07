import { faker } from "@faker-js/faker";
import type { ApiService } from "../types/service.type";
import { ServiceState } from "../types/service.type";

export const generateMockService = (): ApiService => ({
  id: faker.string.uuid(),
  image: faker.image.url(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: parseFloat(faker.commerce.price()),
  provider: {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  },
  category: faker.commerce.department(),
  client: {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  },
  state: faker.helpers.enumValue(ServiceState),
});

export const generateMockServices = (count: number = 10): ApiService[] => {
  return Array.from({ length: count }).map(generateMockService);
};
