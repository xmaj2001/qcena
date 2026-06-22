import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from 'src/modules/bookings/domain/entities/enums/booking-status.enum';
import { PaginatedResponse } from 'src/shared/common/envelope.response';

export class ClientBookingResponse {
  @ApiProperty({ example: 'cm9x1a2b3c4d5e6f7g8h9i0j' })
  bookingId: string;

  @ApiProperty({ example: 'cm9x1a2b3c4d5e6f7g8h9i0l' })
  clientId: string;

  @ApiProperty({ example: 'Xavier Jose' })
  clientName: string;

  @ApiProperty({ example: 'cm9x1a2b3c4d5e6f7g8h9i0k' })
  serviceId: string;

  @ApiProperty({ example: 'Corte de Cabelo' })
  serviceName: string;

  @ApiProperty({ example: 15000 })
  totalPrice: number;

  @ApiProperty({ example: BookingStatus.COMPLETED, enum: BookingStatus })
  status: string;

  @ApiProperty({ example: '2026-01-15T10:00:00.000Z' })
  createdAt: Date;
}

export const PaginatedClientBookingsResponse = PaginatedResponse(
  ClientBookingResponse,
);
