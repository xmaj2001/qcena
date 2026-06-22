import { Module } from '@nestjs/common';
import { IBookingRepository } from './domain/repo/booking.repo';
import { BookingPrismaRepo } from './infra/repo/booking-prisma.repo';
import * as useCases from './app/use-case';
import { BookingClient } from './app/services/booking-client.service';
import { BookingController } from './presentation/controllers/booking.controller';
import { ServiceModule } from '../services/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [BookingController],
  providers: [
    {
      provide: IBookingRepository,
      useClass: BookingPrismaRepo,
    },
    ...Object.values(useCases),
    BookingClient,
  ],
  exports: [IBookingRepository, ...Object.values(useCases), BookingClient],
})
export class BookingModule {}
