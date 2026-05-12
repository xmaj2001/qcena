import { Module } from '@nestjs/common';
import { AuthClientService } from './app/services/auth-client.service';
import { SignUpUseCase } from './app/use-cases/sign-up.use-case';
import { AuthController } from './presentation/controllers/auth.controller';

@Module({
  imports: [],
  providers: [AuthClientService, SignUpUseCase],
  exports: [AuthClientService],
  controllers: [AuthController],
})
export class AuthModules {}
