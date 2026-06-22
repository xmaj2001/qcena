import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { IBookingRepository } from '../../domain/repo/booking.repo';
import { BookingEntity } from '../../domain/entities/booking.entity';
import { BookingStatus } from '../../domain/entities/enums/booking-status.enum';
import { Booking, Prisma } from 'prisma/generated/prisma/client';
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
      include: {
        service: {
          select: {
            name: true,
            images: true,
          },
        },
      },
    });
    return booking ? this.toEntity(booking) : null;
  }

  async findManyByClient(
    clientId: string,
    filter: ListBookingsInput,
  ): Promise<{ data: BookingEntity[]; nextCursor: string | null }> {
    const { status, cursor, limit = 10, search } = filter;
    const where: Prisma.BookingWhereInput = { clientId };
    if (status) where.status = status;
    if (search) {
      where.service = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const bookings = await this.prisma.booking.findMany({
      where,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      orderBy: { createdAt: 'desc' },
      include: {
        service: {
          select: {
            name: true,
            images: true,
          },
        },
      },
    });

    let nextCursor: string | null = null;
    if (bookings.length > limit) {
      const nextItem = bookings.pop();
      nextCursor = nextItem!.id;
    }

    return {
      data: bookings.map((b) => this.toEntity(b)),
      nextCursor,
    };
  }

  async findManyByClientAndService(
    clientId: string,
    serviceId: string,
    limit?: number,
  ): Promise<BookingEntity[]> {
    console.log('clientId', clientId);
    console.log('serviceId', serviceId);
    console.log('limit', limit);
    const bookings = await this.prisma.booking.findMany({
      where: { clientId },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    return bookings.map((b) => this.toEntity(b));
  }

  private toEntity(
    data: Booking & {
      service?: {
        name: string;
        images: string[];
      } | null;
    },
  ): BookingEntity {
    return BookingEntity.reconstruct({
      id: data.id,
      serviceId: data.serviceId,
      clientId: data.clientId,
      totalPrice: data.totalPrice,
      status: data.status as BookingStatus,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      service: data.service
        ? {
            name: data.service.name,
            image: data.service.images[0] ?? null,
          }
        : undefined,
    });
  }
}
