import { Injectable } from '@nestjs/common';
import { IBookingRepository } from '../../domain/repo/booking.repo';
import { ListBookingsInput } from '../../presentation/inputs';

@Injectable()
export class ListProviderBookingsUseCase {
  constructor(private readonly bookingRepo: IBookingRepository) {}

  async execute(providerId: string, filter: ListBookingsInput) {
    const result = await this.bookingRepo.findManyByProvider(
      providerId,
      filter,
    );
    return {
      data: result.data.map((b) => b.toPersistence()),
      total: result.total,
    };
  }
}
