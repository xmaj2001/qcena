import { BaseDomain } from 'src/shared/domain/base-domain.base';
import { BookingStatus } from './enums/booking-status.enum';
import { BadRequestException } from '@nestjs/common';

interface BookingProps {
  serviceId: string;
  clientId: string;
  totalPrice: number;
  status: BookingStatus;
  service?: {
    name: string;
    image: string | null;
  };
}

export class BookingEntity extends BaseDomain {
  private props: BookingProps;

  private constructor(
    props: BookingProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.props = props;
  }

  static create(input: {
    serviceId: string;
    clientId: string;
    totalPrice: number;
    status?: BookingStatus;
    service?: {
      name: string;
      image: string | null;
    };
  }): BookingEntity {
    if (!input.serviceId)
      throw new BadRequestException('Service ID is required');
    if (!input.clientId) throw new BadRequestException('Client ID is required');
    if (input.totalPrice < 0)
      throw new BadRequestException('Price cannot be negative');

    return new BookingEntity({
      serviceId: input.serviceId,
      clientId: input.clientId,
      totalPrice: input.totalPrice,
      status: input.status ?? BookingStatus.PENDING,
      service: input.service,
    });
  }

  static reconstruct(
    props: BookingProps & {
      id: string;
      createdAt: Date;
      updatedAt: Date;
    },
  ): BookingEntity {
    const { id, createdAt, updatedAt, ...rest } = props;
    return new BookingEntity(rest, id, createdAt, updatedAt);
  }

  // Getters
  get serviceId() {
    return this.props.serviceId;
  }
  get clientId() {
    return this.props.clientId;
  }
  get totalPrice() {
    return this.props.totalPrice;
  }
  get status() {
    return this.props.status;
  }
  get service() {
    return this.props.service;
  }

  // Business Logic
  updateStatus(status: BookingStatus): void {
    this.props.status = status;
    this.touch();
  }

  toPersistence() {
    return {
      id: this.id,
      serviceId: this.props.serviceId,
      clientId: this.props.clientId,
      totalPrice: this.props.totalPrice,
      status: this.props.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      service: this.props.service,
    };
  }
}
