import 'dotenv/config';
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  private readonly client: PrismaClient;

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    this.client = new PrismaClient({ adapter });
  }

  get user() {
    return this.client.user;
  }
  get session() {
    return this.client.session;
  }
  get account() {
    return this.client.account;
  }
  get verification() {
    return this.client.verification;
  }
  get service() {
    return this.client.service;
  }
  get booking() {
    return this.client.booking;
  }

  async onModuleInit() {
    this.logger.log('Conectando ao PostgreSQL...');
    await this.client.$connect();
    this.logger.log('Base de dados conectada');
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
