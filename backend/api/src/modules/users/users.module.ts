import { Global, Module } from '@nestjs/common';
import { UserClientService } from './app/services/user-client.service';
import {
  ListAccountsUseCase,
  FindUserByIdUseCase,
  UpdateMeUseCase,
  DeleteMeUseCase,
} from './app/use-case';
import { UsersController } from './presentation/controllers/user.controller';
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
  controllers: [UsersController],
  providers: [
    UserClientService,
    PrismaService,
    ...useCases,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepo,
    },
  ],
  exports: [IUserRepository],
})
export class UsersModule {}
