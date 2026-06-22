import { Injectable } from '@nestjs/common';
import { IBookingRepository } from '../../domain/repo/booking.repo';
import { ListBookingsInput } from '../../presentation/inputs';

@Injectable()
export class GetBookingsUseCase {
  constructor(private readonly bookingRepo: IBookingRepository) {}

  async execute(clientId: string, filter: ListBookingsInput) {
    const result = await this.bookingRepo.findManyByClient(clientId, filter);
    return {
      items: result.data.map((b) => b.toPersistence()),
      nextCursor: result.nextCursor,
    };
  }
}
