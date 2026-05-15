import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './shared/infra/prisma/prisma.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { createBetterAuth } from './shared/auth/betterAuth/betterAuth';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { AuthModules } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ServiceModule } from './modules/services/service.module';
import { BookingModule } from './modules/bookings/booking.module';
import { ClientModule } from './modules/clients/client.module';
import { EmailModule } from './shared/infra/email/email.module';
import { appConfig } from './shared/config/app.config';
import { SendEmailPort } from './shared/ports/send-email-port';
import { BullModule } from '@nestjs/bullmq';
import { bullRedisConfig } from './shared/config/bull.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    PrismaModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: bullRedisConfig,
    }),
    EmailModule,
    AuthModule.forRootAsync({
      imports: [EmailModule],
      inject: [SendEmailPort],
      useFactory: (emailPort: SendEmailPort) => ({
        auth: createBetterAuth(emailPort),
        bodyParser: {
          json: { limit: '2mb' },
          urlencoded: { limit: '2mb', extended: true },
          rawBody: true,
        },
      }),
    }),
    AuthModules,
    UsersModule,
    ServiceModule,
    BookingModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [PrismaModule, AuthModule],
})
export class AppModule {}
