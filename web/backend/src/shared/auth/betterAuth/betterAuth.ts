import { PrismaPg } from '@prisma/adapter-pg';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { bearer, mcp, oneTap } from 'better-auth/plugins';
import { PrismaClient } from 'prisma/generated/prisma/client';
import { SendEmailPort } from 'src/shared/ports/send-email-port';
import {
  onExistingUserSignUp,
  onPasswordReset,
  sendResetPassword,
  sendVerificationEmail,
} from './emails';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const plugins: any[] = [bearer(), oneTap(), mcp({ loginPage: '/sign-in' })];

export function createBetterAuth(emailPort: SendEmailPort) {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

  return betterAuth({
    database: prismaAdapter(prisma, { provider: 'postgresql' }),

    plugins,

    emailAndPassword: {
      enabled: true,
      // requireEmailVerification: true,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: sendResetPassword(emailPort),
      onExistingUserSignUp: onExistingUserSignUp(emailPort),
      onPasswordReset: onPasswordReset(),
    },

    emailVerification: {
      sendVerificationEmail: sendVerificationEmail(emailPort),
    },

    trustedOrigins: [
      'http://localhost:3000', // ← aceita pedidos do frontend
    ],
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    },
  });
}

export type BetterAuthInstance = ReturnType<typeof createBetterAuth>;

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),

  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    // sendResetPassword: sendResetPassword(emailPort),
    // onExistingUserSignUp: onExistingUserSignUp(emailPort),
    onPasswordReset: onPasswordReset(),
  },
});
