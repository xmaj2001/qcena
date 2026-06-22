import { ConfigService } from '@nestjs/config';
import { BullRootModuleOptions } from '@nestjs/bullmq';

export const bullBaseConfig = (): BullRootModuleOptions => ({
  connection: {
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: null, // Isso faz com que o Bull não tente novamente em caso de erro
  },
});

export const bullRedisConfig = (
  config: ConfigService,
): BullRootModuleOptions => ({
  connection: {
    host: config.get<string>('redis.host'),
    port: config.get<number>('redis.port'),
    password: config.get<string>('redis.password'),
  },
});
