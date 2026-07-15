// app/marketplace/_data/services-mock.ts
import { fakerPT_BR as faker } from "@faker-js/faker";
import { Product } from "@/components/products/ProductCard";

// Gera uma quantidade específica de serviços sob demanda
export function generateMockServices(quantity: number): Product[] {
  return Array.from({ length: quantity }, () => {
    const hasDiscount = faker.datatype.boolean(0.3); // 30% de chance de promoção
    const basePrice = faker.number.int({ min: 1500, max: 50000 });
    const oldPrice = hasDiscount ? Math.round(basePrice * 1.25) : undefined;
    const discount = hasDiscount ? 20 : undefined;
    
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName() + " Personalizado",
      category: "Serviço",
      provider: faker.company.name(), // optional if we extend Product to show it, or we use `category`
      image: faker.image.urlPicsumPhotos({ width: 800, height: 600, blur: 0 }),
      price: basePrice,
      oldPrice: oldPrice,
      rating: faker.number.float({ min: 4.0, max: 5.0, multipleOf: 0.1 }),
      reviews: faker.number.int({ min: 5, max: 300 }),
      discount: discount,
      whatsapp: "244900000000"
    };
  });
}

export function generateMockProviders() {
  return Array.from({ length: 6 }, () => ({
    name: faker.company.name(),
    checked: faker.datatype.boolean(0.4),
  }));
}