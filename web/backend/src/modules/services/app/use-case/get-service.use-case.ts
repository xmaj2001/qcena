import { Injectable, NotFoundException } from '@nestjs/common';
import { IServiceRepository } from '../../domain/repo/service.repo';

@Injectable()
export class GetServiceUseCase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(id: string) {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new NotFoundException('Serviço não encontrado');
    }
    return service.toPersistence();
  }
}
