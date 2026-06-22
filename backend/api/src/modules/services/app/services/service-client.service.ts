import { Injectable } from '@nestjs/common';
import {
  CreateServiceUseCase,
  ListServicesUseCase,
  UpdateServiceUseCase,
  DeleteServiceUseCase,
  GetServiceUseCase,
  GetRelatedServicesUseCase,
  GetFeaturedServicesUseCase,
} from '../use-case';
import { CreateServiceInput } from '../../presentation/inputs/create-service.input';
import { UpdateServiceInput } from '../../presentation/inputs/update-service.input';
import { ListServicesInput } from '../../presentation/inputs';
import { ListServicesCategoryUseCase } from '../use-case/list-services-category.use-case';

@Injectable()
export class ServiceClient {
  constructor(
    private readonly createServiceUseCase: CreateServiceUseCase,
    private readonly listServicesUseCase: ListServicesUseCase,
    private readonly updateServiceUseCase: UpdateServiceUseCase,
    private readonly deleteServiceUseCase: DeleteServiceUseCase,
    private readonly getServiceUseCase: GetServiceUseCase,
    private readonly getRelatedServicesUseCase: GetRelatedServicesUseCase,
    private readonly getFeaturedServicesUseCase: GetFeaturedServicesUseCase,
    private readonly listServicesCategoryUseCase: ListServicesCategoryUseCase,
  ) {}

  async createService(input: CreateServiceInput, accountId: string) {
    return this.createServiceUseCase.execute(input, accountId);
  }

  async listServices(filter: ListServicesInput) {
    return this.listServicesUseCase.execute(filter);
  }

  async updateService(
    id: string,
    input: UpdateServiceInput,
    accountId: string,
  ) {
    const inputfull = { id, ...input };
    return this.updateServiceUseCase.execute(inputfull, accountId);
  }

  async deleteService(id: string, accountId: string) {
    return this.deleteServiceUseCase.execute(id, accountId);
  }

  async getService(id: string) {
    return this.getServiceUseCase.execute(id);
  }

  async getRelatedServices(serviceId: string, limit?: number) {
    return this.getRelatedServicesUseCase.execute(serviceId, limit);
  }

  async getFeaturedServices(limit?: number) {
    return this.getFeaturedServicesUseCase.execute(limit);
  }

  listServicesCategory() {
    return this.listServicesCategoryUseCase.execute();
  }
}
