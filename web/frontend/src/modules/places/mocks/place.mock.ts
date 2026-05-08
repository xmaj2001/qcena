import { faker } from "@faker-js/faker";
import type { ApiService } from "@/modules/services/types/service.type";
import { ServiceState } from "@/modules/services/types/service.type";
import { SERVICE_CATEGORIES } from "../types/place.types";

const CATEGORY_SLUGS = SERVICE_CATEGORIES.filter((c) => c.slug !== "all").map(
  (c) => c.slug,
);

const SERVICE_NAMES_BY_CATEGORY: Record<string, string[]> = {
  beleza: [
    "Corte de Cabelo Premium",
    "Manicure & Pedicure",
    "Maquilhagem Profissional",
    "Tratamento Capilar",
    "Design de Sobrancelhas",
    "Massagem Facial",
  ],
  fitness: [
    "Personal Trainer",
    "Aula de Yoga",
    "CrossFit Session",
    "Pilates Reformer",
    "Treino Funcional",
    "Nutrição Desportiva",
  ],
  saude: [
    "Consulta Nutrição",
    "Fisioterapia",
    "Psicologia Online",
    "Massagem Terapêutica",
    "Acupuntura",
    "Osteopatia",
  ],
  reparacoes: [
    "Reparação de Telemóvel",
    "Canalizador",
    "Eletricista",
    "Reparação de Computador",
    "Serralheiro",
    "Técnico de AC",
  ],
  educacao: [
    "Explicações Matemática",
    "Aulas de Inglês",
    "Preparação Exames",
    "Aulas de Música",
    "Programação para Iniciantes",
    "Coaching Escolar",
  ],
  fotografia: [
    "Sessão Fotográfica",
    "Fotografia de Eventos",
    "Edição de Vídeo",
    "Fotografia de Produto",
    "Drone Footage",
    "Retrato Profissional",
  ],
  limpeza: [
    "Limpeza Doméstica",
    "Limpeza de Escritório",
    "Lavagem de Estofos",
    "Limpeza Pós-Obra",
    "Limpeza de Vidros",
    "Desinfecção Profissional",
  ],
  consultoria: [
    "Consultoria Financeira",
    "Consultoria de Marketing",
    "Consultoria Jurídica",
    "Consultoria de TI",
    "Coaching de Carreira",
    "Planeamento Estratégico",
  ],
  eventos: [
    "DJ para Festas",
    "Catering Premium",
    "Decoração de Eventos",
    "Animação Infantil",
    "Aluguer de Espaço",
    "Organização de Casamentos",
  ],
};

function generateDashboardService(category?: string): ApiService {
  const cat = category || faker.helpers.arrayElement(CATEGORY_SLUGS);
  const names = SERVICE_NAMES_BY_CATEGORY[cat] || [
    faker.commerce.productName(),
  ];

  return {
    id: faker.string.uuid(),
    image: faker.image.urlPicsumPhotos({ width: 600, height: 600 }),
    name: faker.helpers.arrayElement(names),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 5, max: 250, dec: 2 })),
    totalReservations: faker.number.int({ min: 0, max: 500 }),
    totalFavorites: faker.number.int({ min: 0, max: 300 }),
    topClients: Array.from({ length: 3 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      totalReservations: faker.number.int({ min: 1, max: 50 }),
    })),
    provider: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      image: faker.image.avatar(),
    },
    category: cat,
    state: ServiceState.ENABLE,
    totalEarnings: parseFloat(
      faker.commerce.price({ min: 100, max: 10000, dec: 2 }),
    ),
  };
}

export function generateDashboardServices(count: number = 18): ApiService[] {
  const services: ApiService[] = [];

  // Guarantee at least 2 services per category
  for (const slug of CATEGORY_SLUGS) {
    services.push(generateDashboardService(slug));
    services.push(generateDashboardService(slug));
  }

  // Fill the rest randomly
  const remaining = Math.max(0, count - services.length);
  for (let i = 0; i < remaining; i++) {
    services.push(generateDashboardService());
  }

  return faker.helpers.shuffle(services);
}
