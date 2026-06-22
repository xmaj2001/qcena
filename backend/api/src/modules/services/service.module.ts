import { Module } from '@nestjs/common';
import { IServiceRepository } from './domain/repo/service.repo';
import { ServicePrismaRepo } from './infra/repo/service-prisma.repo';
import {
  CreateServiceUseCase,
  UpdateServiceUseCase,
  DeleteServiceUseCase,
  GetServiceUseCase,
  ListServicesUseCase,
  GetRelatedServicesUseCase,
  GetFeaturedServicesUseCase,
} from './app/use-case';
import { ServiceController } from './presentation/controllers/service.controller';
import { ServiceClient } from './app/services/service-client.service';
import { ListServicesCategoryUseCase } from './app/use-case/list-services-category.use-case';

const useCases = [
  CreateServiceUseCase,
  UpdateServiceUseCase,
  DeleteServiceUseCase,
  GetServiceUseCase,
  ListServicesUseCase,
  ListServicesCategoryUseCase,
  GetRelatedServicesUseCase,
  GetFeaturedServicesUseCase,
];

@Module({
  controllers: [ServiceController],
  providers: [
    {
      provide: IServiceRepository,
      useClass: ServicePrismaRepo,
    },
    ...useCases,
    ServiceClient,
  ],
  exports: [IServiceRepository, ...useCases, ServiceClient],
})
export class ServiceModule {}
