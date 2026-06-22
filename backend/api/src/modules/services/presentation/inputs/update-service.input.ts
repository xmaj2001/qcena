import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ServiceStatus } from '../../domain/entities/enums/service-status.enum';
import { ServiceCategory } from '../../domain/entities/enums/service-category.enum';

export class UpdateServiceInput {
  @ApiPropertyOptional({
    example: 'Limpeza Residencial Premium',
    description: 'Nome do serviço',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'Serviço completo e especializado de limpeza.',
    description: 'Descrição detalhada do serviço',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 'BELEZA',
    description: 'Categoria do serviço',
    enum: ServiceCategory,
  })
  @IsEnum(ServiceCategory)
  @IsOptional()
  category?: ServiceCategory;

  @ApiPropertyOptional({
    example: ['limpeza', 'premium'],
    description: 'Tags relacionadas ao serviço',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    example: 20000,
    description: 'Preço do serviço em centavos',
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    example: ['https://cdn.qcena.com/service_updated.png'],
    description: 'Lista de URLs de imagens do serviço',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({
    enum: ServiceStatus,
    example: ServiceStatus.DISABLED,
    description: 'Status do serviço',
  })
  @IsEnum(ServiceStatus)
  @IsOptional()
  status?: ServiceStatus;
}
