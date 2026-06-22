import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ListBookingsServiceClientInput {
  @ApiPropertyOptional({ example: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(5)
  @IsOptional()
  limit?: number = 5;

  @ApiPropertyOptional({
    example: 'b7965567-e885-49c3-a194-1b3185f2389b',
    description: 'ID do cliente',
  })
  @IsUUID('4', { message: 'ID do cliente inválido' })
  @IsOptional()
  clientId?: string;
}

export class ListLimitInput {
  @ApiPropertyOptional({ example: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(5)
  @IsOptional()
  limit?: number = 5;
}
