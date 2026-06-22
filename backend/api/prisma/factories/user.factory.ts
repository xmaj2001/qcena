import { faker } from '@faker-js/faker';
import { hashPassword } from 'better-auth/crypto';
import { Gender, Prisma } from '../generated/prisma/client';

// Senha padrão para todos os users gerados pelo seed
export const SEED_PASSWORD = 'Senha@1234';

// Hash calculado uma vez e reutilizado em todos os users
let _cachedHash = '';

export async function getSeedPasswordHash(): Promise<string> {
  if (!_cachedHash) {
    _cachedHash = await hashPassword(SEED_PASSWORD);
  }
  return _cachedHash;
}

/**
 * Gera um único user com o Account de credenciais (email+password) associado.
 * O Account é onde o BetterAuth guarda a senha com hash.
 */
export async function createUserData(
  hashedPassword: string,
  index: number,
  overrides: Partial<Prisma.UserCreateInput> = {},
): Promise<Prisma.UserCreateInput> {
  const gender = faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE]);
  const firstName = faker.person.firstName(
    gender === Gender.MALE ? 'male' : 'female',
  );
  const lastName = faker.person.lastName();
  const userId = faker.string.nanoid(21); // BetterAuth usa nanoid de 21 chars
  const email = index === 0 ? 'user@qcena.com' : `user${index}@qcena.com`;
  return {
    id: userId,
    name: `${firstName} ${lastName}`,
    email,
    emailVerified: faker.datatype.boolean({ probability: 0.8 }),
    image: faker.helpers.maybe(() => faker.image.avatar(), {
      probability: 0.6,
    }),
    gender,
    birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
    // Cria o Account de credenciais inline — BetterAuth usa providerId "credential"
    // Não incluímos "userId" no objeto "create" aninhado porque ele já herda do pai automaticamente e não é permitido em AccountCreateWithoutUserInput
    accounts: {
      create: {
        id: faker.string.nanoid(21),
        accountId: userId,
        providerId: 'credential',
        password: hashedPassword,
      },
    },
    ...overrides,
  };
}

/**
 * Gera um array de N users com as suas passwords já com hash.
 * O hash é calculado uma única vez e partilhado — scrypt é lento por design.
 */
export async function createManyUsersData(
  count: number,
  overrides: Partial<Prisma.UserCreateInput> = {},
): Promise<Prisma.UserCreateInput[]> {
  const hashedPassword = await getSeedPasswordHash();
  return Promise.all(
    Array.from({ length: count }, (_, i) =>
      createUserData(hashedPassword, i + 1, overrides),
    ),
  );
}
