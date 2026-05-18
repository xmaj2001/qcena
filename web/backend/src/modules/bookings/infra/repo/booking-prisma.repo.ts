import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { IBookingRepository } from '../../domain/repo/booking.repo';
import { BookingEntity } from '../../domain/entities/booking.entity';
import { BookingStatus } from '../../domain/entities/enums/booking-status.enum';
import { Booking } from 'prisma/generated/prisma/client';
import { ListBookingsInput } from '../../presentation/inputs';

@Injectable()
export class BookingPrismaRepo implements IBookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(booking: BookingEntity): Promise<void> {
    await this.prisma.booking.create({
      data: {
        id: booking.id,
        serviceId: booking.serviceId,
        clientId: booking.clientId,
        totalPrice: booking.totalPrice,
        status: booking.status,
      },
    });
  }

  async update(booking: BookingEntity): Promise<void> {
    await this.prisma.booking.update({
      where: { id: booking.id },
      data: {
        totalPrice: booking.totalPrice,
        status: booking.status,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.booking.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<BookingEntity | null> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });
    return booking ? this.toEntity(booking) : null;
  }

  async findManyByClient(
    clientId: string,
    filter: ListBookingsInput,
  ): Promise<{ data: BookingEntity[]; total: number }> {
    const { status, page = 1, limit = 10 } = filter;
    const where: any = { clientId };
    if (status) where.status = status;

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.booking.count({ where }),
    ]);

    return {
      data: bookings.map((b) => this.toEntity(b)),
      total,
    };
  }

  async findManyByProvider(
    providerId: string,
    filter: ListBookingsInput,
  ): Promise<{ data: BookingEntity[]; total: number }> {
    const { status, page = 1, limit = 10 } = filter;
    const where: any = {
      service: {
        providerId: providerId,
      },
    };
    if (status) where.status = status;

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.booking.count({ where }),
    ]);

    return {
      data: bookings.map((b) => this.toEntity(b)),
      total,
    };
  }

  private toEntity(data: Booking): BookingEntity {
    return BookingEntity.reconstruct({
      id: data.id,
      serviceId: data.serviceId,
      clientId: data.clientId,
      totalPrice: data.totalPrice,
      status: data.status as BookingStatus,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
