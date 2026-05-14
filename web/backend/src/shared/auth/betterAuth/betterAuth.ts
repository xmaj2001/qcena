import { PrismaPg } from '@prisma/adapter-pg';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { bearer } from 'better-auth/plugins';
import { PrismaClient } from 'src/shared/infra/prisma/generated/prisma/client';
import { SendEmailPort } from 'src/shared/ports/send-email-port';
import {
  onExistingUserSignUp,
  onPasswordReset,
  sendResetPassword,
  sendVerificationEmail,
} from './emails';

export function createBetterAuth(emailPort: SendEmailPort) {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

  return betterAuth({
    database: prismaAdapter(prisma, { provider: 'postgresql' }),

    plugins: [bearer()],

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: sendResetPassword(emailPort),
      onExistingUserSignUp: onExistingUserSignUp(emailPort),
      onPasswordReset: onPasswordReset(),
    },

    emailVerification: {
      sendVerificationEmail: sendVerificationEmail(emailPort),
    },
  });
}

export type BetterAuthInstance = ReturnType<typeof createBetterAuth>;
