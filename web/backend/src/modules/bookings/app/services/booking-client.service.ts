import { Injectable } from '@nestjs/common';
import { CreateBookingUseCase } from '../use-case/create-booking.use-case';
import { UpdateBookingUseCase } from '../use-case/update-booking.use-case';
import { DeleteBookingUseCase } from '../use-case/delete-booking.use-case';
import { GetBookingUseCase } from '../use-case/get-booking.use-case';
import { ListProviderBookingsUseCase } from '../use-case/list-provider-bookings.use-case';
import {
  CreateBookingInput,
  ListBookingsInput,
  UpdateBookingInput,
} from '../../presentation/inputs';

@Injectable()
export class BookingClient {
  constructor(
    private readonly createBookingUseCase: CreateBookingUseCase,
    private readonly updateBookingUseCase: UpdateBookingUseCase,
    private readonly deleteBookingUseCase: DeleteBookingUseCase,
    private readonly getBookingUseCase: GetBookingUseCase,
    private readonly listProviderBookingsUseCase: ListProviderBookingsUseCase,
  ) {}

  async create(input: CreateBookingInput, clientId: string) {
    return this.createBookingUseCase.execute(input, clientId);
  }

  async updateStatus(id: string, input: UpdateBookingInput, userId: string) {
    return this.updateBookingUseCase.execute(id, input, userId);
  }

  async delete(id: string, userId: string) {
    return this.deleteBookingUseCase.execute(id, userId);
  }

  async getById(id: string, userId: string) {
    return this.getBookingUseCase.execute(id, userId);
  }

  async listAsProvider(providerId: string, filter: ListBookingsInput) {
    return this.listProviderBookingsUseCase.execute(providerId, filter);
  }
}
