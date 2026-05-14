import { ListBookingsInput } from '../../presentation/inputs';
import { BookingEntity } from '../entities/booking.entity';

export abstract class IBookingRepository {
  abstract create(booking: BookingEntity): Promise<void>;
  abstract update(booking: BookingEntity): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<BookingEntity | null>;
  abstract findManyByClient(
    clientId: string,
    filter: ListBookingsInput,
  ): Promise<{ data: BookingEntity[]; total: number }>;
  abstract findManyByProvider(
    providerId: string,
    filter: ListBookingsInput,
  ): Promise<{ data: BookingEntity[]; total: number }>;
}
