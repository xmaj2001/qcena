import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { BookingStatus } from '../../domain/entities/enums/booking-status.enum';

export class UpdateBookingInput {
  @ApiProperty({
    enum: BookingStatus,
    example: BookingStatus.CONFIRMED,
    description: 'Novo status da reserva',
  })
  @IsEnum(BookingStatus, {
    message: `Enum de status invalido. Use ${Object.values(BookingStatus).join(', ')}`,
  })
  @IsNotEmpty()
  status: BookingStatus;
}
