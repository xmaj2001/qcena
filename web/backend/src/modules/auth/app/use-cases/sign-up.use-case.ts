import { Injectable, Logger } from '@nestjs/common';
import { SignUpInput } from '../../presentation/inputs/sign-up.Input';
import { auth } from 'src/shared/auth/betterAuth/betterAuth';

@Injectable()
export class SignUpUseCase {
  private readonly logger = new Logger(SignUpUseCase.name);
  constructor() {}

  async execute(input: SignUpInput) {
    this.logger.log(`Executing sign up use case`);
    try {
      const data = await auth.api.signUpEmail({
        body: {
          email: input.email,
          password: input.password,
          name: input.name,
          rememberMe: input.rememberMe,
        },
      });
      this.logger.log(`User signed up successfully`);
      return data;
    } catch (error: any) {
      this.logger.error(`Failed to sign up user`, error);
      throw error;
    }
  }
}
