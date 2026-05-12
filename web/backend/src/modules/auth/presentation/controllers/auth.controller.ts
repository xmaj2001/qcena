import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthClientService } from '../../app/services/auth-client.service';
import { Body, Post } from '@nestjs/common';
import { SignUpInput } from '../inputs/sign-up.Input';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@ApiBearerAuth()
@AllowAnonymous()
@Controller('auth')
export class AuthController {
  constructor(private readonly authClientService: AuthClientService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registar novo utilizador' })
  @ApiResponse({ status: 201, description: 'Utilizador criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'Email já existe' })
  async signUp(@Body() input: SignUpInput) {
    return this.authClientService.signUp(input);
  }
}
