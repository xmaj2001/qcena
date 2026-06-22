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

export interface ServiceDetailData {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  price: number;
  category: string;
  tags: string[];
  state: ServiceStatus;
  totalReservations: number;
  totalFavorites: number;
  totalEarnings: number;
  topClients: {
    id: string;
    name: string;
    image: string | null;
    totalReservations: number;
  }[];
  provider: {
    id: string;
    name: string;
    image: string | null;
  };
}

export abstract class IServiceRepository {
  abstract create(service: ServiceEntity): Promise<void>;
  abstract update(service: ServiceEntity): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<ServiceEntity | null>;
  abstract findAll(
    filter: ListServicesFilter,
  ): Promise<{ data: ServiceEntity[]; nextCursor: string | null }>;
  abstract findDetails(id: string): Promise<ServiceDetailData | null>;
  abstract findFeatured(limit: number): Promise<ServiceDetailData[]>;
  abstract findRelated(
    serviceId: string,
    limit: number,
  ): Promise<ServiceEntity[]>;
}
