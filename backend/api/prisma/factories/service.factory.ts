import { faker } from '@faker-js/faker';
import { Prisma, ServiceStatus } from '../generated/prisma/client';
import { ServiceCategory } from 'src/modules/services/domain/entities/enums/service-category.enum';

const SERVICE_CATEGORIES = [
  'Beleza & Estética',
  'Reparações & Manutenção',
  'Saúde & Bem-estar',
  'Educação & Formação',
  'Tecnologia',
  'Eventos & Entretenimento',
  'Limpeza',
  'Transporte',
  'Fotografia',
  'Design',
] as const;

const SERVICE_NAMES_BY_CATEGORY: Record<string, string[]> = {
  'Beleza & Estética': [
    'Corte de cabelo masculino',
    'Tranças afro',
    'Manicure & pedicure',
    'Depilação completa',
    'Maquilhagem para eventos',
  ],
  'Reparações & Manutenção': [
    'Reparação de electrodomésticos',
    'Canalizações',
    'Electricidade residencial',
    'Pintura de interiores',
    'Carpintaria',
  ],
  'Saúde & Bem-estar': [
    'Massagem relaxante',
    'Consulta nutricional',
    'Personal trainer',
    'Fisioterapia',
    'Yoga individual',
  ],
  'Educação & Formação': [
    'Aulas de inglês',
    'Explicações de matemática',
    'Formação em Excel',
    'Aulas de guitarra',
    'Curso de culinária',
  ],
  Tecnologia: [
    'Desenvolvimento de website',
    'Reparação de computadores',
    'Instalação de redes Wi-Fi',
    'Edição de vídeo',
    'Criação de app mobile',
  ],
  'Eventos & Entretenimento': [
    'DJ para festas',
    'Animação infantil',
    'Organização de eventos corporativos',
    'Serviço de catering',
    'Decoração de festas',
  ],
  Limpeza: [
    'Limpeza residencial',
    'Limpeza pós-obra',
    'Lavandaria ao domicílio',
    'Limpeza de escritórios',
    'Higienização de sofás',
  ],
  Transporte: [
    'Mudanças residenciais',
    'Entrega de encomendas',
    'Táxi de longa distância',
    'Transporte escolar',
    'Aluguer de veículo com motorista',
  ],
  Fotografia: [
    'Fotografia de casamentos',
    'Sessão fotográfica corporativa',
    'Fotografia de produto',
    'Fotografia de eventos',
    'Retratos de família',
  ],
  Design: [
    'Design de logótipo',
    'Design de cartões de visita',
    'Criação de conteúdo para redes sociais',
    'Design de banners',
    'Design de apresentações',
  ],
};

/**
 * Gera um serviço para um providerId específico.
 */
export function createServiceData(
  providerId: string,
  overrides: Partial<Prisma.ServiceUncheckedCreateInput> = {},
): Prisma.ServiceUncheckedCreateInput {
  const category = faker.helpers.arrayElement(Object.values(ServiceCategory));
  const names = SERVICE_NAMES_BY_CATEGORY[category] ?? ['Serviço geral'];
  const name = faker.helpers.arrayElement(names);

  // Preço em centavos (AOA). Ex: 500_00 = 50.000 Kz
  const priceAOA = faker.number.int({ min: 500_00, max: 200_000_00 });

  return {
    id: faker.string.nanoid(21),
    providerId,
    name,
    description: faker.helpers.maybe(
      () => faker.lorem.sentences({ min: 1, max: 3 }),
      { probability: 0.75 },
    ),
    category,
    tags: faker.helpers.arrayElements(
      [category.split(' ')[0], faker.word.noun(), faker.word.adjective()],
      { min: 0, max: 3 },
    ),
    price: priceAOA,
    images: Array.from({ length: faker.number.int({ min: 0, max: 4 }) }, () =>
      faker.image.url({ width: 800, height: 600 }),
    ),
    status: faker.helpers.weightedArrayElement([
      { value: ServiceStatus.ENABLED, weight: 9 },
      { value: ServiceStatus.DISABLED, weight: 1 },
    ]),
    ...overrides,
  };
}

/**
 * Gera N serviços para um provider.
 */
export function createManyServicesData(
  providerId: string,
  count: number,
): Prisma.ServiceUncheckedCreateInput[] {
  return Array.from({ length: count }, () => createServiceData(providerId));
}
