export interface AppConfig {
  app: {
    name: string;
    port: number;
    env: string;
    isDev: boolean;
    isProd: boolean;
    cors: {
      origin: string;
      credentials: boolean;
    };
    seed: {
      adminName: string;
      adminEmail: string;
      adminPassword: string;
      adminUsername: string;
    };
  };
  jwt: {
    accessSecret: string;
    accessExpiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
  redis: {
    host: string;
    port: number;
    password?: string;
  };
  email: {
    provider: string;
    from: string;
    resendApiKey: string;
    smtp: {
      host: string;
      port: number;
      user: string;
      pass: string;
    };
  };
  otp: {
    expiresSeconds: number;
  };
  log: {
    level: string;
    pretty: boolean;
  };
  webhook: {
    secret: string;
  };
}
