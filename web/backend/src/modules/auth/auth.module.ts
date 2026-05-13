import { Module } from '@nestjs/common';
import { AuthClientService } from './app/services/auth-client.service';
import { SignUpUseCase } from './app/use-cases/sign-up.use-case';
import { AuthController } from './presentation/controllers/auth.controller';
import {
  ChangePasswordUseCase,
  ForgotPasswordUseCase,
  GetSessionUseCase,
  ResetPasswordUseCase,
  ResendVerificationUseCase,
  SignInUseCase,
  SignOutUseCase,
} from './app/use-cases';
import { AuthService } from '@thallesp/nestjs-better-auth';

const useCases = [
  SignUpUseCase,
  SignInUseCase,
  SignOutUseCase,
  GetSessionUseCase,
  ForgotPasswordUseCase,
  ResetPasswordUseCase,
  ChangePasswordUseCase,
  ResendVerificationUseCase,
];
@Module({
  imports: [],
  providers: [AuthClientService, AuthService, ...useCases],
  controllers: [AuthController],
  exports: [AuthClientService],
})
export class AuthModules {}
