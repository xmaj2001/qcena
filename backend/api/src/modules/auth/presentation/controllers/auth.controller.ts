import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { AuthClientService } from '../../app/services/auth-client.service';
import { Body, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { fromNodeHeaders } from 'better-auth/node';
import {
  ChangePasswordInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  SignInInput,
  SignUpInput,
} from '../inputs';
import type { Request } from 'express';
import { VerifyEmailInput } from '../inputs/verify-email.input';

@AllowAnonymous()
@Controller('auth')
export class AuthController {
  constructor(private readonly authClientService: AuthClientService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registar novo utilizador',
    description:
      'Regista um novo utilizador com email e senha. O email deve ser verificado após o registo.',
  })
  @ApiResponse({ status: 201, description: 'Utilizador criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'Email já existe' })
  async signUp(@Body() input: SignUpInput) {
    return this.authClientService.signUp(input);
  }

  // ─── SIGN IN ──────────────────────────────────────────────────────────────
  @Post('sign-in')
  @AllowAnonymous()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Entrar na conta',
    description:
      'Entra na conta do utilizador fornecendo email e senha. Retorna o token da sessão se as credenciais forem válidas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido, retorna token',
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @ApiResponse({ status: 403, description: 'Email não verificado' })
  async signIn(@Body() input: SignInInput) {
    return this.authClientService.signIn(input);
  }

  // ─── SIGN OUT ─────────────────────────────────────────────────────────────
  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('session-token')
  @ApiOperation({
    summary: 'Terminar sessão',
    description:
      'Termina a sessão atual do utilizador autenticado. Deve ser chamada com o token da sessão no header.',
  })
  @ApiResponse({ status: 200, description: 'Sessão terminada com sucesso' })
  async signOut(@Req() req: Request) {
    return this.authClientService.signOut(fromNodeHeaders(req.headers));
  }

  // ─── ME (sessão atual) ────────────────────────────────────────────────────
  @Get('me')
  @ApiBearerAuth('session-token')
  @ApiOperation({
    summary: 'Obter sessão',
    description:
      'Obtém a sessão atual do utilizador autenticado. Deve ser chamada com o token da sessão no header.',
  })
  @ApiResponse({ status: 200, description: 'Dados da sessão atual' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  async me(@Req() req: Request) {
    return this.authClientService.getSession(fromNodeHeaders(req.headers));
  }

  // ─── FORGOT PASSWORD ──────────────────────────────────────────────────────
  @Post('forgot-password')
  @AllowAnonymous()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Esqueci-me da senha',
    description:
      'Envia um email com um link para redefinir a senha para o email fornecido.',
  })
  @ApiResponse({
    status: 200,
    description: 'Email de reset enviado (se existir)',
  })
  async forgotPassword(@Body() input: ForgotPasswordInput) {
    return this.authClientService.forgotPassword(input);
  }

  // ─── RESET PASSWORD ───────────────────────────────────────────────────────
  @Post('reset-password')
  @AllowAnonymous()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Redefinir senha',
    description:
      'Redefine a senha do utilizador usando o token enviado via email (link de redefinição de senha).',
  })
  @ApiResponse({ status: 200, description: 'Senha redefinida com sucesso' })
  @ApiResponse({ status: 400, description: 'Token inválido ou expirado' })
  async resetPassword(@Body() input: ResetPasswordInput) {
    return this.authClientService.resetPassword(input);
  }

  // ─── CHANGE PASSWORD ──────────────────────────────────────────────────────
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('session-token')
  @ApiOperation({
    summary: 'Alterar senha',
    description:
      'Altera a senha do utilizador autenticado. O utilizador deve estar autenticado.',
  })
  @ApiResponse({ status: 200, description: 'Senha alterada com sucesso' })
  @ApiResponse({ status: 400, description: 'Senha atual incorreta' })
  async changePassword(
    @Body() input: ChangePasswordInput,
    @Req() req: Request,
  ) {
    return this.authClientService.changePassword(
      input,
      fromNodeHeaders(req.headers),
    );
  }

  // ─── VERIFY EMAIL ─────────────────────────────────────────────────────────
  @Post('verify-email/resend')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('session-token')
  @ApiOperation({
    summary: 'Reenviar verificação de email',
    description:
      'Token do email enviado via email (link de verificação) para reenviar email de verificação',
  })
  @ApiResponse({ status: 200, description: 'Email reenviado' })
  async resendVerification(@Req() req: Request) {
    return this.authClientService.resendVerification(
      fromNodeHeaders(req.headers),
    );
  }

  // ─── VERIFY EMAIL (com token do link) ────────────────────────────────────
  @Get('verify-email')
  @AllowAnonymous()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verificar email',
    description: 'Token do email enviado via email (link de verificação)',
  })
  @ApiResponse({ status: 200, description: 'Email verificado com sucesso' })
  @ApiResponse({ status: 400, description: 'Token inválido ou expirado' })
  async verifyEmail(@Query() input: VerifyEmailInput) {
    return this.authClientService.verifyEmail(input.token);
  }
}
