import { Injectable } from '@nestjs/common';
import {
  IServiceRepository,
  ListServicesFilter,
  ServiceDetailData,
} from 'src/modules/services/domain/repo/service.repo';
import { ServiceEntity } from 'src/modules/services/domain/entities/service.entity';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { Prisma, Service } from 'prisma/generated/prisma/client';
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

    const where: Prisma.ServiceWhereInput = {};

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
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
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

  // ── Detalhes enriquecidos de um único serviço ──────────────────────────────
  async findDetails(id: string): Promise<ServiceDetailData | null> {
    return this.enrichServiceData({ id });
  }

  // ── Serviços mais reservados da plataforma ("favoritos") ───────────────────
  async findFeatured(limit: number): Promise<ServiceDetailData[]> {
    // 1. Descobrir os IDs dos serviços com mais bookings
    const topBookings = await this.prisma.booking.groupBy({
      by: ['serviceId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: limit,
    });

    if (topBookings.length === 0) {
      // Fallback: buscar os serviços mais recentes se não houver reservas
      const recent = await this.prisma.service.findMany({
        where: { status: 'ENABLED' },
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: { id: true },
      });
      topBookings.push(
        ...recent.map((s) => ({ serviceId: s.id, _count: { id: 0 } })),
      );
    }

    // 2. Enriquecer cada um com os detalhes completos (em paralelo)
    const details = await Promise.all(
      topBookings.map(({ serviceId }) =>
        this.enrichServiceData({ id: serviceId }),
      ),
    );

    // Filtrar nulls (serviço pode ter sido eliminado entretanto)
    return details.filter((d): d is ServiceDetailData => d !== null);
  }

  // ── Serviços relacionados (mesma categoria, excluindo o atual) ─────────────
  async findRelated(
    serviceId: string,
    limit: number,
  ): Promise<ServiceEntity[]> {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      select: { category: true },
    });

    if (!service) return [];

    const related = await this.prisma.service.findMany({
      where: {
        category: service.category,
        id: { not: serviceId },
        status: 'ENABLED',
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return related.map((s) => this.toEntity(s));
  }

  // ── Helper privado: enriquecer um serviço com métricas ────────────────────
  private async enrichServiceData(where: {
    id: string;
  }): Promise<ServiceDetailData | null> {
    const service = await this.prisma.service.findUnique({
      where: { id: where.id },
      include: {
        provider: { select: { id: true, name: true, image: true } },
        bookings: {
          select: {
            clientId: true,
            totalPrice: true,
            status: true,
          },
        },
      },
    });

    if (!service) return null;

    const totalReservations = service.bookings.length;
    const totalEarnings = service.bookings.reduce(
      (sum, b) => sum + b.totalPrice,
      0,
    );

    // Favoritos: clientes que fizeram mais de 1 reserva (proxy de "favorito")
    const clientCountMap = new Map<string, number>();
    for (const b of service.bookings) {
      clientCountMap.set(b.clientId, (clientCountMap.get(b.clientId) ?? 0) + 1);
    }
    const totalFavorites = [...clientCountMap.values()].filter(
      (c) => c > 1,
    ).length;

    // Top clientes (por número de reservas, desc)
    const topClientIds = [...clientCountMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([clientId]) => clientId);

    const topUsersData = await this.prisma.user.findMany({
      where: { id: { in: topClientIds } },
      select: { id: true, name: true, image: true },
    });

    const userMap = new Map(topUsersData.map((u) => [u.id, u]));

    const topClients = topClientIds.map((clientId) => {
      const user = userMap.get(clientId);
      return {
        id: clientId,
        name: user?.name ?? 'Desconhecido',
        image: user?.image ?? null,
        totalReservations: clientCountMap.get(clientId) ?? 0,
      };
    });

    return {
      id: service.id,
      name: service.name,
      description: service.description,
      images: service.images,
      price: service.price,
      category: service.category,
      tags: service.tags,
      state: service.status as ServiceStatus,
      totalReservations,
      totalFavorites,
      totalEarnings,
      topClients,
      provider: {
        id: service.provider.id,
        name: service.provider.name,
        image: service.provider.image ?? null,
      },
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
