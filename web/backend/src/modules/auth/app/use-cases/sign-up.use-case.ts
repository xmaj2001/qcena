import { Injectable, Logger } from '@nestjs/common';
import { SignUpInput } from '../../presentation/inputs';
import { AuthService } from '@thallesp/nestjs-better-auth';

@Injectable()
export class SignUpUseCase {
  private readonly logger = new Logger(SignUpUseCase.name);
  constructor(private readonly authService: AuthService) {}

  async execute(input: SignUpInput) {
    this.logger.log(`Executing sign up use case`);
    const data = await this.authService.api.signUpEmail({
      body: {
        email: input.email,
        password: input.password,
        name: input.name,
        rememberMe: input.rememberMe,
      },
    });
    this.logger.log(`User signed up successfully`);
    return data;
  }
}
