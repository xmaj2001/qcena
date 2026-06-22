import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookingStatus } from '../../domain/entities/enums/booking-status.enum';
import { SuccessResponse } from 'src/shared/common/envelope.response';

export class BookingServiceResponse {
  @ApiProperty({ example: 'Limpeza de Pele' })
  name: string;

  @ApiProperty({ example: 'https://...', nullable: true })
  image: string | null;
}

export class BookingResponse {
  @ApiProperty({ example: 'cm9x1a2b3c4d5e6f7g8h9i0j' })
  id: string;

  @ApiProperty({ example: 'cm9x1a2b3c4d5e6f7g8h9i0k' })
  serviceId: string;

  @ApiProperty({ example: 'cm9x1a2b3c4d5e6f7g8h9i0l' })
  clientId: string;

  @ApiProperty({ example: '2026-06-01T14:00:00.000Z' })
  scheduledAt: Date;

  @ApiProperty({ example: 15000 })
  totalPrice: number;

  @ApiProperty({
    example: BookingStatus.PENDING,
    enum: BookingStatus,
  })
  status: BookingStatus;

  @ApiPropertyOptional({ type: () => BookingServiceResponse })
  service?: BookingServiceResponse;

  @ApiProperty({ example: '2026-01-01T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-05-13T10:00:00.000Z' })
  updatedAt: Date;
}

export class CursorPaginatedBookings {
  @ApiProperty({ type: () => [BookingResponse] })
  items: BookingResponse[];

  @ApiPropertyOptional({ example: 'cm9x1a2b3c4d5e6f7g8h9i0j', nullable: true })
  nextCursor: string | null;
}

export const PaginatedBookingsResponse = SuccessResponse(
  CursorPaginatedBookings,
);
export const SingleBookingResponse = SuccessResponse(BookingResponse);
