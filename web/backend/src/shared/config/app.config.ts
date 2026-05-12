import { jwtEnv } from './env/jwt.env';
import { redisEnv } from './env/redis.env';

export const appConfig = () => ({
  app: {
    name: process.env.APP_NAME ?? 'Backend',
    port: parseInt(process.env.PORT ?? '3000', 10),
    env: process.env.NODE_ENV ?? 'development',
    isDev: (process.env.NODE_ENV ?? 'development') === 'development',
    isProd: process.env.NODE_ENV === 'production',
    cors: {
      origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
      credentials: true,
    },
  },
  jwt: jwtEnv(),
  redis: redisEnv(),
  email: {
    provider: process.env.EMAIL_PROVIDER ?? 'resend',
    from: process.env.EMAIL_FROM ?? 'noreply@transcender.app',
    resendApiKey: process.env.RESEND_API_KEY ?? '',
    smtp: {
      host: process.env.SMTP_HOST ?? '',
      port: parseInt(process.env.SMTP_PORT ?? '587', 10),
      user: process.env.SMTP_USER ?? '',
      pass: process.env.SMTP_PASS ?? '',
    },
  },
  otp: {
    expiresSeconds: parseInt(process.env.OTP_EXPIRES_SECONDS ?? '300', 10),
  },
  log: {
    level: process.env.LOG_LEVEL ?? 'debug',
    pretty: process.env.LOG_PRETTY === 'true',
  },
  webhook: {
    secret: process.env.WEBHOOK_SECRET ?? 'webhook-secret',
  },
});
