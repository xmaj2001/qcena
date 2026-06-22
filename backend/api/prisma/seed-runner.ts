import { createManyUsersData } from './factories/user.factory';
import { createManyServicesData } from './factories/service.factory';
import { createManyBookingsData } from './factories/booking.factory';
import { PrismaClient } from './generated/prisma/client';

// ─── Configuração de volume ────────────────────────────────────────────────────
const CONFIG = {
  /** Total de utilizadores criados */
  USERS: 50,
  /** Serviços por user (intervalo aleatório) */
  SERVICES_PER_USER: { min: 1, max: 5 },
  /** Reservas por serviço (intervalo aleatório) */
  BOOKINGS_PER_SERVICE: { min: 0, max: 8 },
};
// ──────────────────────────────────────────────────────────────────────────────

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function runSeed(prisma: PrismaClient) {
  console.log('🌱 A iniciar seed...\n');

  // ── 1. Users ────────────────────────────────────────────────────────────────
  console.log(`👤 A criar ${CONFIG.USERS} utilizadores...`);
  const usersData = await createManyUsersData(CONFIG.USERS);

  // Prisma.createMany não suporta escritas de relações aninhadas (nested writes) como o "accounts".
  // Portanto, criamos cada utilizador individualmente para associar as contas de credenciais.
  for (const data of usersData) {
    await prisma.user.create({ data });
  }

  const userIds = usersData.map((u) => u.id);
  console.log(`   ✓ ${userIds.length} utilizadores criados\n`);

  // ── 2. Services ─────────────────────────────────────────────────────────────
  console.log('🛎  A criar serviços...');
  let totalServices = 0;

  // Guarda { serviceId, price, providerId } para as reservas
  const servicesMeta: Array<{
    id: string;
    price: number;
    providerId: string;
  }> = [];

  for (const userId of userIds) {
    const count = randInt(
      CONFIG.SERVICES_PER_USER.min,
      CONFIG.SERVICES_PER_USER.max,
    );
    const servicesData = createManyServicesData(userId, count);

    await prisma.service.createMany({
      data: servicesData,
      skipDuplicates: true,
    });

    for (const s of servicesData) {
      servicesMeta.push({
        id: s.id,
        price: s.price ?? 42,
        providerId: s.providerId,
      });
    }

    totalServices += count;
  }

  console.log(`   ✓ ${totalServices} serviços criados\n`);

  // ── 3. Bookings ─────────────────────────────────────────────────────────────
  console.log('📅 A criar reservas...');
  let totalBookings = 0;

  for (const { id: serviceId, price, providerId } of servicesMeta) {
    const count = randInt(
      CONFIG.BOOKINGS_PER_SERVICE.min,
      CONFIG.BOOKINGS_PER_SERVICE.max,
    );

    if (count === 0) continue;

    const bookingsData = createManyBookingsData(
      serviceId,
      price,
      providerId,
      userIds,
      count,
    );

    if (bookingsData.length === 0) continue;

    await prisma.booking.createMany({ data: bookingsData });
    totalBookings += bookingsData.length;
  }

  console.log(`   ✓ ${totalBookings} reservas criadas\n`);

  // ── Resumo ──────────────────────────────────────────────────────────────────
  console.log('─────────────────────────────────');
  console.log(`✅ Seed concluído!`);
  console.log(`   Users:    ${userIds.length}`);
  console.log(`   Services: ${totalServices}`);
  console.log(`   Bookings: ${totalBookings}`);
  console.log('─────────────────────────────────\n');
}
