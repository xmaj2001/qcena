import { Module } from '@nestjs/common';
import { IClientRepository } from './domain/repo/client.repo';
import { ClientPrismaRepo } from './infra/repo/client-prisma.repo';
import {
  ListClientsUseCase,
  CheckIsClientUseCase,
  GetTopClientsUseCase,
  ListClientBookingsUseCase,
  GetFavoriteServiceUseCase,
  GetClientDetailsUseCase,
} from './app/use-case';
import { ClientClientService } from './app/services/client-client.service';
import { ClientController } from './presentation/controllers/client.controller';

const useCases = [
  ListClientsUseCase,
  CheckIsClientUseCase,
  GetTopClientsUseCase,
  ListClientBookingsUseCase,
  GetFavoriteServiceUseCase,
  GetClientDetailsUseCase,
];

@Module({
  controllers: [ClientController],
  providers: [
    {
      provide: IClientRepository,
      useClass: ClientPrismaRepo,
    },
    ...useCases,
    ClientClientService,
  ],
  exports: [IClientRepository, ...useCases, ClientClientService],
})
export class ClientModule {}
