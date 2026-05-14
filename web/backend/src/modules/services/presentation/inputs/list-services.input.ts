import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ServiceStatus } from '../../domain/entities/enums/service-status.enum';
import { ServiceCategory } from '../../domain/entities/enums/service-category.enum';

export class ListServicesInput {
  @ApiPropertyOptional({
    example: 'uuid-cursor',
    description: 'Cursor para paginação (ID do último item da página anterior)',
  })
  @IsString()
  @IsOptional()
  cursor?: string;

  @ApiPropertyOptional({
    example: 10,
    description: 'Quantidade de itens por página',
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit: number = 10;

  @ApiPropertyOptional({
    enum: ServiceStatus,
    description: 'Filtrar por status',
  })
  @IsEnum(ServiceStatus)
  @IsOptional()
  status?: ServiceStatus;

  @ApiPropertyOptional({
    example: 'BELEZA',
    description: 'Filtrar por categoria',
    enum: ServiceCategory,
  })
  @IsEnum(ServiceCategory)
  @IsOptional()
  category?: ServiceCategory;

  @ApiPropertyOptional({
    example: 1000,
    description: 'Preço mínimo em centavos',
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  minPrice?: number;

  @ApiPropertyOptional({
    example: 50000,
    description: 'Preço máximo em centavos',
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  maxPrice?: number;

  @ApiPropertyOptional({
    example: 'limpeza',
    description: 'Busca textual por nome ou descrição',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
