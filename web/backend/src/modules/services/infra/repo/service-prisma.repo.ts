import { Injectable } from '@nestjs/common';
import {
  IServiceRepository,
  ListServicesFilter,
} from 'src/modules/services/domain/repo/service.repo';
import { ServiceEntity } from 'src/modules/services/domain/entities/service.entity';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { Service } from 'src/shared/infra/prisma/generated/prisma/client';
import { ServiceStatus } from '../../domain/entities/enums/service-status.enum';

@Injectable()
export class ServicePrismaRepo implements IServiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(service: ServiceEntity): Promise<void> {
    await this.prisma.service.create({
      data: {
        id: service.id,
        providerId: service.providerId,
        name: service.name,
        description: service.description,
        category: service.category,
        tags: service.tags,
        price: service.price,
        images: service.images,
        status: service.status,
      },
    });
  }

  async update(service: ServiceEntity): Promise<void> {
    await this.prisma.service.update({
      where: { id: service.id },
      data: service.toPersistence(),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.service.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<ServiceEntity | null> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });
    return service ? this.toEntity(service) : null;
  }

  async findAll(
    filter: ListServicesFilter,
  ): Promise<{ data: ServiceEntity[]; nextCursor: string | null }> {
    const { cursor, limit, status, category, minPrice, maxPrice, search } =
      filter;

    const where: any = {};

    if (status) where.status = status;
    if (category) where.category = category;
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const services = await this.prisma.service.findMany({
      where,
      take: limit + 1, // Fetch one extra to determine if there's a next page
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0, // Skip the cursor element itself
      orderBy: [
        { status: 'asc' },
        { name: 'asc' },
        { category: 'asc' },
        { price: 'asc' },
        { id: 'asc' },
      ],
    });

    let nextCursor: string | null = null;
    if (services.length > limit) {
      const nextItem = services.pop();
      nextCursor = nextItem!.id;
    }

    return {
      data: services.map((s) => this.toEntity(s)),
      nextCursor,
    };
  }

  private toEntity(data: Service): ServiceEntity {
    return ServiceEntity.reconstruct({
      id: data.id,
      providerId: data.providerId,
      name: data.name,
      description: data.description,
      category: data.category,
      tags: data.tags,
      price: data.price,
      images: data.images,
      status: data.status as ServiceStatus,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
