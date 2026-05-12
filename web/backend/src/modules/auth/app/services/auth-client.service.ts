import { Injectable, Logger } from '@nestjs/common';
import { SignUpUseCase } from '../use-cases/sign-up.use-case';
import { SignUpInput } from '../../presentation/inputs/sign-up.Input';

@Injectable()
export class AuthClientService {
  private readonly logger = new Logger(AuthClientService.name);
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async signUp(input: SignUpInput) {
    return this.signUpUseCase.execute(input);
  }
}
