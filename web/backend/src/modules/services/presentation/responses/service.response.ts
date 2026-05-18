import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ServiceStatus } from '../../domain/entities/enums/service-status.enum';
import { ServiceCategory } from '../../domain/entities/enums/service-category.enum';
import {
  PaginatedResponse,
  SuccessResponse,
  SuccessArrayResponse,
} from 'src/shared/common/envelope.response';

// ─── Resposta de listagem (simples) ──────────────────────────────────────────

export class ServiceResponse {
  @ApiProperty({ example: 'cm9x1a2b3c4d5e6f7g8h9i0j' })
  id: string;

  @ApiProperty({ example: 'cm9x1a2b3c4d5e6f7g8h9i0k' })
  providerId: string;

  @ApiProperty({ example: 'Limpeza Residencial' })
  name: string;

  @ApiPropertyOptional({
    example: 'Serviço completo de limpeza para sua casa.',
  })
  description: string | null;

  @ApiProperty({
    example: ServiceCategory.BELEZA_E_ESTÉTICA,
    enum: ServiceCategory,
  })
  category: ServiceCategory;

  @ApiProperty({ example: ['limpeza', 'casa'] })
  tags: string[];

  @ApiProperty({ example: 15000 })
  price: number;

  @ApiProperty({ example: ['https://cdn.qcena.com/service1.png'] })
  images: string[];

  @ApiProperty({
    example: ServiceStatus.ENABLED,
    enum: ServiceStatus,
  })
  status: ServiceStatus;

  @ApiProperty({ example: '2026-01-01T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-05-13T10:00:00.000Z' })
  updatedAt: Date;
}

// ─── Sub-DTOs do detalhe ──────────────────────────────────────────────────────

export class ServiceTopClientResponse {
  @ApiProperty({ example: 'usr_abc123' })
  id: string;

  @ApiProperty({ example: 'Ana Silva' })
  name: string;

  @ApiPropertyOptional({ example: 'https://cdn.qcena.com/avatar.png' })
  image: string | null;

  @ApiProperty({ example: 5 })
  totalReservations: number;
}

export class ServiceProviderResponse {
  @ApiProperty({ example: 'usr_xyz789' })
  id: string;

  @ApiProperty({ example: 'João Prestador' })
  name: string;

  @ApiPropertyOptional({ example: 'https://cdn.qcena.com/avatar.png' })
  image: string | null;
}

// ─── Resposta de detalhe (GET /services/:id e GET /services/featured) ────────

export class ServiceDetailResponse {
  @ApiProperty({ example: 'cm9x1a2b3c4d5e6f7g8h9i0j' })
  id: string;

  @ApiProperty({ example: 'Limpeza Residencial' })
  name: string;

  @ApiPropertyOptional({
    example: 'Serviço completo de limpeza para sua casa.',
  })
  description: string | null;

  @ApiProperty({ example: ['https://cdn.qcena.com/service1.png'] })
  images: string[];

  @ApiProperty({ example: 15000 })
  price: number;

  @ApiProperty({ example: 'BELEZA' })
  category: string;

  @ApiProperty({ example: ['limpeza', 'casa'] })
  tags: string[];

  @ApiProperty({
    example: ServiceStatus.ENABLED,
    enum: ServiceStatus,
  })
  state: ServiceStatus;

  @ApiProperty({ example: 42 })
  totalReservations: number;

  @ApiProperty({ example: 7 })
  totalFavorites: number;

  @ApiProperty({ example: 630000 })
  totalEarnings: number;

  @ApiProperty({ type: () => [ServiceTopClientResponse] })
  topClients: ServiceTopClientResponse[];

  @ApiProperty({ type: () => ServiceProviderResponse })
  provider: ServiceProviderResponse;
}

// ─── Envelopes Swagger ────────────────────────────────────────────────────────

export const PaginatedServicesResponse = PaginatedResponse(ServiceResponse);
export const SingleServiceResponse = SuccessResponse(ServiceDetailResponse);
export const RelatedServicesResponse = SuccessResponse(ServiceResponse);
export const FeaturedServicesResponse = SuccessArrayResponse(
  ServiceDetailResponse,
);
