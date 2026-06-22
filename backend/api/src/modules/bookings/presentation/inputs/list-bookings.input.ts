import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { BookingStatus } from '../../domain/entities/enums/booking-status.enum';

export class ListBookingsInput {
  @ApiPropertyOptional({
    enum: BookingStatus,
    description: 'Filtrar por status da reserva',
  })
  @IsEnum(BookingStatus, {
    message: `Status validos: ${Object.values(BookingStatus).join(', ')}`,
  })
  @IsOptional()
  status?: BookingStatus;

  @ApiPropertyOptional({
    example: 'uuid-cursor',
    description: 'Cursor para paginação (ID do último item da página anterior)',
  })
  @IsString()
  @IsOptional()
  cursor?: string;

  @ApiPropertyOptional({
    example: 10,
    default: 10,
    description: 'Quantidade de itens por página',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit: number = 10;

  @ApiPropertyOptional({
    example: 'limpeza',
    description: 'Busca textual por nome ou descrição do serviço',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
