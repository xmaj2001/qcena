import { Injectable } from '@nestjs/common';
import { CreateBookingUseCase } from '../use-case/create-booking.use-case';
import { UpdateBookingUseCase } from '../use-case/update-booking.use-case';
import { DeleteBookingUseCase } from '../use-case/delete-booking.use-case';
import { GetBookingUseCase } from '../use-case/get-booking.use-case';
import { GetBookingsUseCase } from '../use-case/get-bookings.use-case';
import {
  CreateBookingInput,
  ListBookingsInput,
  UpdateBookingInput,
} from '../../presentation/inputs';
import { ListBookingsServiceClientUseCase } from '../use-case/list-bookings-service-client.use-case';

@Injectable()
export class BookingClient {
  constructor(
    private readonly createBookingUseCase: CreateBookingUseCase,
    private readonly updateBookingUseCase: UpdateBookingUseCase,
    private readonly deleteBookingUseCase: DeleteBookingUseCase,
    private readonly getBookingUseCase: GetBookingUseCase,
    private readonly getBookingsUseCase: GetBookingsUseCase,
    private readonly listBookingsServiceClientUseCase: ListBookingsServiceClientUseCase,
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

  async getBookings(clientId: string, filter: ListBookingsInput) {
    return this.getBookingsUseCase.execute(clientId, filter);
  }

  async listAsClient(clientId: string, serviceId: string, limit?: number) {
    return this.listBookingsServiceClientUseCase.execute(
      clientId,
      serviceId,
      limit,
    );
  }
}
