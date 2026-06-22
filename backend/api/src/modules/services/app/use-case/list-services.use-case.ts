import { Injectable } from '@nestjs/common';
import {
  IServiceRepository,
  ListServicesFilter,
} from '../../domain/repo/service.repo';

@Injectable()
export class ListServicesUseCase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(filter: ListServicesFilter) {
    const result = await this.serviceRepository.findAll(filter);
    return {
      items: result.data.map((s) => s.toPersistence()),
      nextCursor: result.nextCursor,
    };
  }
}
