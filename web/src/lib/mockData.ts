// app/marketplace/_data/services-mock.ts
import { fakerPT_BR as faker } from "@faker-js/faker";

export interface Service {
  id: string;
  title: string;
  provider: string;
  price: string;
  image: string;
  oldPrice?: string;
  top?: boolean;
  featured?: boolean;
}

// Gera uma quantidade específica de serviços sob demanda
export function generateMockServices(quantity: number): Service[] {
  return Array.from({ length: quantity }, () => {
    const hasDiscount = faker.datatype.boolean(0.3); // 30% de chance de promoção
    const basePrice = faker.number.int({ min: 150, max: 5000 });
    
    return {
      id: faker.string.uuid(),
      title: faker.commerce.productName() + " Personalizado",
      provider: faker.company.name(),
      image: faker.image.urlPicsumPhotos({ width: 800, height: 600, blur: 0 }),
      price: `R$ ${basePrice.toLocaleString("pt-BR")}`,
      oldPrice: hasDiscount ? `R$ ${(basePrice * 1.25).toFixed(0).toLocaleString()}` : undefined,
      top: faker.datatype.boolean(0.15),
      featured: faker.datatype.boolean(0.08),
    };
  });
}

export function generateMockProviders() {
  return Array.from({ length: 6 }, () => ({
    name: faker.company.name(),
    checked: faker.datatype.boolean(0.4),
  }));
}