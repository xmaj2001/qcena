import { Controller, Get, Post } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('accounts')
export class AccountsController {
  @Get()
  @AllowAnonymous()
  getAccounts() {}
}
