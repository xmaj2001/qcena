import { emailEnv } from './env/email.env';
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
  email: emailEnv(),
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
