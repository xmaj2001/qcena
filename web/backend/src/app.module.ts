import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './shared/prisma/prisma.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './shared/auth/betterAuth/betterAuth';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { AuthModules } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule.forRoot({ auth }),
    AuthModules,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [PrismaModule],
})
export class AppModule {}
