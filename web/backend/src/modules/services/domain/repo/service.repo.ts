import { ServiceEntity } from '../entities/service.entity';
import { ServiceStatus } from '../entities/enums/service-status.enum';

export interface ListServicesFilter {
  cursor?: string;
  limit: number;
  status?: ServiceStatus;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export abstract class IServiceRepository {
  abstract create(service: ServiceEntity): Promise<void>;
  abstract update(service: ServiceEntity): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<ServiceEntity | null>;
  abstract findAll(
    filter: ListServicesFilter,
  ): Promise<{ data: ServiceEntity[]; nextCursor: string | null }>;
}
