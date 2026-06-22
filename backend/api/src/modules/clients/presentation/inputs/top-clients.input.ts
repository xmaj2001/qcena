import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class TopClientsInput {
  @ApiPropertyOptional({
    example: 5,
    default: 5,
    description: 'Número de top clientes a retornar (max 100)',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 5;
}
