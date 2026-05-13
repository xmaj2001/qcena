import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './shared/prisma/prisma.module';
import { AuthModule, AuthService } from '@thallesp/nestjs-better-auth';
import { createBetterAuth } from './shared/auth/betterAuth/betterAuth';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { AuthModules } from './modules/auth/auth.module';
import { AccountModule } from './modules/accounts/account.module';
import { EmailModule } from './shared/transports/sendEmail/adapteres/email.module';
import { appConfig } from './shared/config/app.config';
import { SendEmailPort } from './shared/transports/sendEmail/send-email-port';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    PrismaModule,
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
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [PrismaModule, AuthModule],
})
export class AppModule {}
