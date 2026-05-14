import { Module } from '@nestjs/common';
import { IBookingRepository } from './domain/repo/booking.repo';
import { BookingPrismaRepo } from './infra/repo/booking-prisma.repo';
import {
  CreateBookingUseCase,
  UpdateBookingUseCase,
  DeleteBookingUseCase,
  GetBookingUseCase,
  ListClientBookingsUseCase,
  ListProviderBookingsUseCase,
} from './app/use-case';
import { BookingClient } from './app/services/booking-client.service';
import { BookingController } from './presentation/controllers/booking.controller';
import { ServiceModule } from '../services/service.module';
import { AccountModule } from '../accounts/account.module';

const useCases = [
  CreateBookingUseCase,
  UpdateBookingUseCase,
  DeleteBookingUseCase,
  GetBookingUseCase,
  ListClientBookingsUseCase,
  ListProviderBookingsUseCase,
];

@Module({
  imports: [ServiceModule, AccountModule],
  controllers: [BookingController],
  providers: [
    {
      provide: IBookingRepository,
      useClass: BookingPrismaRepo,
    },
    ...useCases,
    BookingClient,
  ],
  exports: [IBookingRepository, ...useCases, BookingClient],
})
export class BookingModule {}
