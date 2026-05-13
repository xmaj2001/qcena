import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListAccountsQuery {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    example: 'xavier',
    description: 'Filtrar por nome ou email',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
