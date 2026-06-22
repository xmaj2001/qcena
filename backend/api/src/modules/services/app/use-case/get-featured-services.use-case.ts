import { Injectable } from '@nestjs/common';
import {
  IServiceRepository,
  ServiceDetailData,
} from '../../domain/repo/service.repo';

@Injectable()
export class GetFeaturedServicesUseCase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(limit = 10): Promise<ServiceDetailData[]> {
    return this.serviceRepository.findFeatured(limit);
  }
}
