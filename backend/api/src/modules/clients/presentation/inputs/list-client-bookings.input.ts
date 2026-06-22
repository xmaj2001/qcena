import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { BookingStatus } from 'src/modules/bookings/domain/entities/enums/booking-status.enum';

export class ListClientBookingsInput {
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
    description: 'Filtrar por um cliente específico (userId)',
    example: 'cm9x1a2b3c4d5e6f7g8h9i0l',
  })
  @IsString()
  @IsOptional()
  clientId?: string;
}
