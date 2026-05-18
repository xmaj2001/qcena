import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IServiceRepository,
  ServiceDetailData,
} from '../../domain/repo/service.repo';

@Injectable()
export class GetServiceUseCase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(id: string): Promise<ServiceDetailData> {
    const detail = await this.serviceRepository.findDetails(id);
    if (!detail) {
      throw new NotFoundException('Serviço não encontrado');
    }
    return detail;
  }
}
