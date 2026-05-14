import { Injectable } from '@nestjs/common';
import {
  CreateServiceUseCase,
  ListServicesUseCase,
  UpdateServiceUseCase,
  DeleteServiceUseCase,
  GetServiceUseCase,
} from '../use-case';
import { CreateServiceInput } from '../../presentation/inputs/create-service.input';
import { UpdateServiceInput } from '../../presentation/inputs/update-service.input';
import { ListServicesInput } from '../../presentation/inputs';

@Injectable()
export class ServiceClient {
  constructor(
    private readonly createServiceUseCase: CreateServiceUseCase,
    private readonly listServicesUseCase: ListServicesUseCase,
    private readonly updateServiceUseCase: UpdateServiceUseCase,
    private readonly deleteServiceUseCase: DeleteServiceUseCase,
    private readonly getServiceUseCase: GetServiceUseCase,
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
}
