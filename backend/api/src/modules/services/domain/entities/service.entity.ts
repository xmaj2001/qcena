import { BaseDomain } from 'src/shared/domain/base-domain.base';
import { ServiceStatus } from './enums/service-status.enum';
import { BadRequestException } from '@nestjs/common';

interface ServiceProps {
  providerId: string;
  name: string;
  description: string | null;
  category: string;
  tags: string[];
  price: number;
  images: string[];
  status: ServiceStatus;
}

interface ServiceCreateProps {
  providerId: string;
  name: string;
  description?: string;
  category: string;
  tags?: string[];
  price?: number;
  images?: string[];
  status?: ServiceStatus;
}

export class ServiceEntity extends BaseDomain {
  private props: ServiceProps;

  private constructor(
    props: ServiceProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this.props = props;
  }

  static create(input: ServiceCreateProps): ServiceEntity {
    if (!input.providerId)
      throw new BadRequestException('Provider ID is required');
    if (!input.name?.trim()) throw new BadRequestException('Name is required');
    if (!input.category?.trim())
      throw new BadRequestException('Category is required');

    return new ServiceEntity({
      providerId: input.providerId,
      name: input.name.trim(),
      description: input.description ?? null,
      category: input.category.trim(),
      tags: input.tags ?? [],
      price: input.price ?? 0,
      images: input.images ?? [],
      status: input.status ?? ServiceStatus.ENABLED,
    });
  }

  static reconstruct(
    props: ServiceProps & {
      id: string;
      createdAt: Date;
      updatedAt: Date;
    },
  ): ServiceEntity {
    const { id, createdAt, updatedAt, ...rest } = props;
    return new ServiceEntity(rest, id, createdAt, updatedAt);
  }

  // Getters
  get providerId() {
    return this.props.providerId;
  }
  get name() {
    return this.props.name;
  }
  get description() {
    return this.props.description;
  }
  get category() {
    return this.props.category;
  }
  get tags() {
    return this.props.tags;
  }
  get price() {
    return this.props.price;
  }
  get images() {
    return this.props.images;
  }
  get status() {
    return this.props.status;
  }

  // Business Logic
  update(input: {
    name?: string;
    description?: string;
    category?: string;
    tags?: string[];
    price?: number;
    images?: string[];
    status?: ServiceStatus;
  }): void {
    if (input.name !== undefined) {
      if (!input.name.trim())
        throw new BadRequestException('Name cannot be empty');
      this.props.name = input.name.trim();
    }
    if (input.description !== undefined)
      this.props.description = input.description ?? null;
    if (input.category !== undefined) {
      if (!input.category.trim())
        throw new BadRequestException('Category cannot be empty');
      this.props.category = input.category.trim();
    }
    if (input.tags !== undefined) this.props.tags = input.tags;
    if (input.price !== undefined) this.props.price = input.price;
    if (input.images !== undefined) this.props.images = input.images;
    if (input.status !== undefined) this.props.status = input.status;

    this.touch();
  }

  toPersistence() {
    return {
      id: this.id,
      providerId: this.props.providerId,
      name: this.props.name,
      description: this.props.description,
      category: this.props.category,
      tags: this.props.tags,
      price: this.props.price,
      images: this.props.images,
      status: this.props.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
