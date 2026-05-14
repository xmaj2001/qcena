import { Global, Module } from '@nestjs/common';
import { AccountClientService } from './app/services/account-client.service';
import {
  ListAccountsUseCase,
  FindUserByIdUseCase,
  UpdateMeUseCase,
  DeleteMeUseCase,
} from './app/use-case';
import { AccountsController } from './presentation/controllers/accounts.controller';
import { IUserRepository } from './domain/repo/user.repo';
import { UserPrismaRepo } from './infra/repo/user-prisma.repo';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';

const useCases = [
  ListAccountsUseCase,
  FindUserByIdUseCase,
  UpdateMeUseCase,
  DeleteMeUseCase,
];

@Global()
@Module({
  controllers: [AccountsController],
  providers: [
    AccountClientService,
    PrismaService,
    ...useCases,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepo,
    },
  ],
  exports: [IUserRepository],
})
export class AccountModule {}
