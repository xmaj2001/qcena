import { Injectable } from '@nestjs/common';
import { ListBookingsInput } from '../../presentation/inputs';
import { IBookingRepository } from '../../domain/repo/booking.repo';

@Injectable()
export class ListClientBookingsUseCase {
  constructor(private readonly bookingRepo: IBookingRepository) {}

  async execute(clientId: string, filter: ListBookingsInput) {
    const result = await this.bookingRepo.findManyByClient(clientId, filter);
    return {
      data: result.data.map((b) => b.toPersistence()),
      total: result.total,
    };
  }
}
