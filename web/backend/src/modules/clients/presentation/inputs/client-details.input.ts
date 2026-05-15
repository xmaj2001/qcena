import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ClientDetailsInput {
  @ApiPropertyOptional({
    example: 5,
    default: 5,
    description: 'Número de serviços favoritos a retornar (max 42)',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(42)
  @IsOptional()
  servicesLimit?: number = 5;
}
