import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ServiceStatus } from '../../domain/entities/enums/service-status.enum';
import { ServiceCategory } from '../../domain/entities/enums/service-category.enum';
import {
  PaginatedResponse,
  SuccessResponse,
} from 'src/shared/common/envelope.response';

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
    example: ServiceCategory.BELEZA,
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

export const PaginatedServicesResponse = PaginatedResponse(ServiceResponse);
export const SingleServiceResponse = SuccessResponse(ServiceResponse);
