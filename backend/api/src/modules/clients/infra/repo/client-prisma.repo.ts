import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { IClientRepository } from '../../domain/repo/client.repo';
import {
  ClientSummary,
  ClientDetailsData,
  ClientBookingData,
  FavoriteServiceData,
} from '../../domain/types/client.types';
import { ClientEntity } from '../../domain/entities/client.entity';
import { ClientRank } from '../../domain/entities/enums/client-rank.enum';
import { ListClientsInput } from '../../presentation/inputs/list-clients.input';
import { ListClientBookingsInput } from '../../presentation/inputs/list-client-bookings.input';

@Injectable()
export class ClientPrismaRepo implements IClientRepository {
  private readonly logger = new Logger(ClientPrismaRepo.name);

  constructor(private readonly prisma: PrismaService) {}

  // ── Lista clientes de um provedor (paginado) ──────────────────────────────
  async findClientsByProvider(
    providerId: string,
    filter: ListClientsInput,
  ): Promise<{ data: ClientSummary[]; total: number }> {
    const { page = 1, limit = 10, search } = filter;

    // 1. Encontrar todos os clientIds distintos que têm bookings nos serviços do provedor
    const whereBooking: any = {
      service: { providerId },
    };

    // Se houver search, filtrar pelos dados do user
    if (search) {
      whereBooking.client = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    // Agrupar por clientId para obter clientes únicos
    const groupedClients = await this.prisma.booking.groupBy({
      by: ['clientId'],
      where: whereBooking,
      _count: { id: true },
    });

    const totalClients = groupedClients.length;

    // 2. Calcular scores para ranking
    const allScores = await this.calculateAllScores(providerId, groupedClients);

    // 3. Ordenar por score desc e paginar
    allScores.sort((a, b) => b.score - a.score);
    const paginatedIds = allScores
      .slice((page - 1) * limit, page * limit)
      .map((s) => s.clientId);

    // 4. Buscar dados dos users
    const users = await this.prisma.user.findMany({
      where: { id: { in: paginatedIds } },
      select: { id: true, name: true, image: true, email: true },
    });

    const userMap = new Map(users.map((u) => [u.id, u]));

    // 5. Montar resultado
    const data: ClientSummary[] = paginatedIds.map((clientId) => {
      const user = userMap.get(clientId);
      const scoreEntry = allScores.find((s) => s.clientId === clientId);
      const position = allScores.findIndex((s) => s.clientId === clientId);
      const rank = ClientEntity.determineRank(position, totalClients);

      return {
        userId: clientId,
        name: user?.name ?? 'Desconhecido',
        avatarUrl: user?.image ?? null,
        email: user?.email ?? '',
        rank,
        totalBookings: scoreEntry?.totalBookings ?? 0,
      };
    });

    return { data, total: totalClients };
  }

  // ── Verificar se é cliente ─────────────────────────────────────────────────
  async isClientOfProvider(
    providerId: string,
    userId: string,
  ): Promise<boolean> {
    const count = await this.prisma.booking.count({
      where: {
        clientId: userId,
        service: { providerId },
      },
    });
    return count > 0;
  }

  // ── Top N clientes ─────────────────────────────────────────────────────────
  async findTopClients(
    providerId: string,
    limit: number,
  ): Promise<ClientSummary[]> {
    const groupedClients = await this.prisma.booking.groupBy({
      by: ['clientId'],
      where: { service: { providerId } },
      _count: { id: true },
    });

    if (groupedClients.length === 0) return [];

    const allScores = await this.calculateAllScores(providerId, groupedClients);
    allScores.sort((a, b) => b.score - a.score);

    const topIds = allScores.slice(0, limit).map((s) => s.clientId);
    const totalClients = allScores.length;

    const users = await this.prisma.user.findMany({
      where: { id: { in: topIds } },
      select: { id: true, name: true, image: true, email: true },
    });

    const userMap = new Map(users.map((u) => [u.id, u]));

    return topIds.map((clientId) => {
      const user = userMap.get(clientId);
      const position = allScores.findIndex((s) => s.clientId === clientId);
      const rank = ClientEntity.determineRank(position, totalClients);
      const scoreEntry = allScores.find((s) => s.clientId === clientId);

      return {
        userId: clientId,
        name: user?.name ?? 'Desconhecido',
        avatarUrl: user?.image ?? null,
        email: user?.email ?? '',
        rank,
        totalBookings: scoreEntry?.totalBookings ?? 0,
      };
    });
  }

  // ── Reservas dos clientes ──────────────────────────────────────────────────
  async findClientBookings(
    providerId: string,
    filter: ListClientBookingsInput,
  ): Promise<{ data: ClientBookingData[]; total: number }> {
    const { page = 1, limit = 10, status, clientId } = filter;

    const where: any = {
      service: { providerId },
    };
    if (clientId) where.clientId = clientId;
    if (status) where.status = status;

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        include: {
          client: { select: { id: true, name: true } },
          service: { select: { id: true, name: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.booking.count({ where }),
    ]);

    const data: ClientBookingData[] = bookings.map((b) => ({
      bookingId: b.id,
      clientId: b.clientId,
      clientName: b.client.name,
      serviceId: b.serviceId,
      serviceName: b.service.name,
      totalPrice: b.totalPrice,
      status: b.status,
      createdAt: b.createdAt,
    }));

    return { data, total };
  }

  // ── Serviço favorito ───────────────────────────────────────────────────────
  async findFavoriteService(
    providerId: string,
    clientId: string,
  ): Promise<FavoriteServiceData | null> {
    const result = await this.findClientTopServices(providerId, clientId, 1);
    return result.length > 0 ? result[0] : null;
  }

  // ── Top serviços favoritos ─────────────────────────────────────────────────
  async findClientTopServices(
    providerId: string,
    clientId: string,
    limit: number,
  ): Promise<FavoriteServiceData[]> {
    // Agrupar bookings por serviceId para este cliente nos serviços do provedor
    const grouped = await this.prisma.booking.groupBy({
      by: ['serviceId'],
      where: {
        clientId,
        service: { providerId },
      },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: limit,
    });

    if (grouped.length === 0) return [];

    const serviceIds = grouped.map((g) => g.serviceId);
    const services = await this.prisma.service.findMany({
      where: { id: { in: serviceIds } },
      select: { id: true, name: true, category: true },
    });

    const serviceMap = new Map(services.map((s) => [s.id, s]));

    return grouped.map((g) => {
      const service = serviceMap.get(g.serviceId);
      return {
        serviceId: g.serviceId,
        serviceName: service?.name ?? 'Desconhecido',
        category: service?.category ?? '',
        timesBooked: g._count.id,
      };
    });
  }

  // ── Detalhes completos do cliente ──────────────────────────────────────────
  async findClientDetails(
    providerId: string,
    clientId: string,
    servicesLimit: number,
  ): Promise<ClientDetailsData | null> {
    // Verificar se é realmente cliente
    const isClient = await this.isClientOfProvider(providerId, clientId);
    if (!isClient) return null;

    // Dados do user
    const user = await this.prisma.user.findUnique({
      where: { id: clientId },
      select: { id: true, name: true, image: true, gender: true },
    });

    if (!user) return null;

    // Agregações de bookings
    const [completedAgg, canceledCount, pendingCount, favoriteServices] =
      await Promise.all([
        this.prisma.booking.aggregate({
          where: {
            clientId,
            service: { providerId },
            status: 'COMPLETED',
          },
          _count: { id: true },
          _sum: { totalPrice: true },
        }),
        this.prisma.booking.count({
          where: {
            clientId,
            service: { providerId },
            status: 'CANCELED',
          },
        }),
        this.prisma.booking.count({
          where: {
            clientId,
            service: { providerId },
            status: 'PENDING',
          },
        }),
        this.findClientTopServices(providerId, clientId, servicesLimit),
      ]);

    const totalCompleted = completedAgg._count.id;
    const totalSpent = completedAgg._sum.totalPrice ?? 0;

    // Calcular rank deste cliente entre todos os clientes do provedor
    const allGrouped = await this.prisma.booking.groupBy({
      by: ['clientId'],
      where: { service: { providerId } },
      _count: { id: true },
    });

    const allScores = await this.calculateAllScores(providerId, allGrouped);
    allScores.sort((a, b) => b.score - a.score);

    const position = allScores.findIndex((s) => s.clientId === clientId);
    const rank = ClientEntity.determineRank(position, allScores.length);

    return {
      userId: user.id,
      name: user.name,
      avatarUrl: user.image ?? null,
      gender: user.gender ?? null,
      favoriteServices,
      totalCompleted,
      totalCanceled: canceledCount,
      totalPending: pendingCount,
      totalSpent,
      rank,
    };
  }

  // ── Helper: Calcular scores de todos os clientes ───────────────────────────
  private async calculateAllScores(
    providerId: string,
    groupedClients: { clientId: string; _count: { id: number } }[],
  ): Promise<{ clientId: string; score: number; totalBookings: number }[]> {
    const clientIds = groupedClients.map((g) => g.clientId);

    if (clientIds.length === 0) return [];

    // Buscar métricas por cliente em batch
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [completedPerClient, canceledPerClient, recentPerClient] =
      await Promise.all([
        // Completed bookings + total spent por cliente
        this.prisma.booking.groupBy({
          by: ['clientId'],
          where: {
            clientId: { in: clientIds },
            service: { providerId },
            status: 'COMPLETED',
          },
          _count: { id: true },
          _sum: { totalPrice: true },
        }),
        // Canceled bookings por cliente
        this.prisma.booking.groupBy({
          by: ['clientId'],
          where: {
            clientId: { in: clientIds },
            service: { providerId },
            status: 'CANCELED',
          },
          _count: { id: true },
        }),
        // Reservas recentes (últimos 30 dias)
        this.prisma.booking.groupBy({
          by: ['clientId'],
          where: {
            clientId: { in: clientIds },
            service: { providerId },
            createdAt: { gte: thirtyDaysAgo },
          },
          _count: { id: true },
        }),
      ]);

    const completedMap = new Map(
      completedPerClient.map((c) => [
        c.clientId,
        { count: c._count.id, spent: c._sum.totalPrice ?? 0 },
      ]),
    );
    const canceledMap = new Map(
      canceledPerClient.map((c) => [c.clientId, c._count.id]),
    );
    const recentMap = new Map(
      recentPerClient.map((c) => [c.clientId, c._count.id]),
    );

    return groupedClients.map((g) => {
      const completed = completedMap.get(g.clientId) ?? {
        count: 0,
        spent: 0,
      };
      const canceled = canceledMap.get(g.clientId) ?? 0;
      const hasRecent = (recentMap.get(g.clientId) ?? 0) > 0 ? 1 : 0;
      const totalBookings = g._count.id;

      const entity = ClientEntity.create({
        userId: g.clientId,
        name: '',
        avatarUrl: null,
        email: '',
        gender: null,
        totalCompleted: completed.count,
        totalCanceled: canceled,
        totalPending: totalBookings - completed.count - canceled,
        totalSpent: completed.spent,
        rank: ClientRank.BRONZE, // temporário, rank é calculado depois
      });

      return {
        clientId: g.clientId,
        score: entity.calculateScore(hasRecent),
        totalBookings,
      };
    });
  }
}
