import { faker } from '@faker-js/faker';
import type { ApiService } from '../types/service.type';

export const generateMockService = (): ApiService => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: parseFloat(faker.commerce.price()),
  images: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => faker.image.url()),
});

export const generateMockServices = (count: number = 10): ApiService[] => {
  return Array.from({ length: count }).map(generateMockService);
};
