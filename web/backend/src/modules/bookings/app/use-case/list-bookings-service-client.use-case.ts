import { Injectable } from '@nestjs/common';
import { IBookingRepository } from '../../../bookings/domain/repo/booking.repo';

@Injectable()
export class ListBookingsServiceClientUseCase {
  constructor(private readonly bookingRepo: IBookingRepository) {}

  async execute(clientId: string, serviceId: string, limit?: number) {
    const result = await this.bookingRepo.findManyByClientAndService(
      clientId,
      serviceId,
      limit,
    );
    return result.map((b) => b.toPersistence());
  }
}
