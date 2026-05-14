import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ServiceStatus } from '../../domain/entities/enums/service-status.enum';
import { ServiceCategory } from '../../domain/entities/enums/service-category.enum';

export class CreateServiceInput {
  @ApiProperty({
    example: 'Limpeza Residencial',
    description: 'Nome do serviço',
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @ApiPropertyOptional({
    example: 'Serviço completo de limpeza para sua casa.',
    description: 'Descrição detalhada do serviço',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: ServiceCategory.BELEZA,
    description: 'Categoria do serviço',
    enum: ServiceCategory,
  })
  @IsEnum(ServiceCategory)
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  category: ServiceCategory;

  @ApiPropertyOptional({
    example: ['limpeza', 'casa', 'residencial'],
    description: 'Tags relacionadas ao serviço',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    example: 15000,
    description: 'Preço do serviço em centavos',
    default: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    example: ['https://cdn.qcena.com/service1.png'],
    description: 'Lista de URLs de imagens do serviço',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({
    enum: ServiceStatus,
    example: ServiceStatus.ENABLED,
    description: 'Status do serviço',
    default: ServiceStatus.ENABLED,
  })
  @IsEnum(ServiceStatus)
  @IsOptional()
  status?: ServiceStatus;
}
