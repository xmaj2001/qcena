import { Injectable } from '@nestjs/common';
import { IServiceRepository } from '../../domain/repo/service.repo';

@Injectable()
export class GetRelatedServicesUseCase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(serviceId: string, limit = 8) {
    const related = await this.serviceRepository.findRelated(serviceId, limit);
    return related.map((s) => s.toPersistence());
  }
}
