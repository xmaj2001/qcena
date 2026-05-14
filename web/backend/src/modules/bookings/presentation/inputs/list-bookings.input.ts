import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
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

  @ApiPropertyOptional({ example: 1, default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;
}
