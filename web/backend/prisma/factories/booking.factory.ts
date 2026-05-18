import { faker } from '@faker-js/faker';
import { BookingStatus, Prisma } from '../generated/prisma/client';

/**
 * Gera uma reserva.
 * @param serviceId  - ID do serviço reservado
 * @param clientId   - ID do utilizador que faz a reserva
 * @param servicePrice - Preço actual do serviço (guardado no momento da reserva)
 */
export function createBookingData(
  serviceId: string,
  clientId: string,
  servicePrice: number,
  overrides: Partial<Prisma.BookingUncheckedCreateInput> = {},
): Prisma.BookingUncheckedCreateInput {
  // Simula variação de preço: ±15% do preço actual
  const variation = faker.number.float({ min: 0.85, max: 1.15 });
  const totalPrice = Math.round(servicePrice * variation);

  return {
    serviceId,
    clientId,
    totalPrice,
    status: faker.helpers.weightedArrayElement([
      { value: BookingStatus.COMPLETED, weight: 5 },
      { value: BookingStatus.CONFIRMED, weight: 2 },
      { value: BookingStatus.PENDING, weight: 2 },
      { value: BookingStatus.CANCELED, weight: 1 },
    ]),
    ...overrides,
  };
}

/**
 * Gera N reservas para um serviço, com clients aleatórios da lista fornecida.
 * Garante que o client não é o próprio provider do serviço.
 */
export function createManyBookingsData(
  serviceId: string,
  servicePrice: number,
  serviceProviderId: string,
  allUserIds: string[],
  count: number,
): Prisma.BookingUncheckedCreateInput[] {
  // Clientes possíveis: todos os users excepto o provider
  const eligibleClients = allUserIds.filter((id) => id !== serviceProviderId);

  if (eligibleClients.length === 0) return [];

  return Array.from({ length: count }, () => {
    const clientId = faker.helpers.arrayElement(eligibleClients);
    return createBookingData(serviceId, clientId, servicePrice);
  });
}
