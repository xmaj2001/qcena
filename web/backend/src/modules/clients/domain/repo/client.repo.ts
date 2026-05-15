import {
  ClientSummary,
  ClientDetailsData,
  ClientBookingData,
  FavoriteServiceData,
} from '../types/client.types';
import { ListClientsInput } from '../../presentation/inputs/list-clients.input';
import { ListClientBookingsInput } from '../../presentation/inputs/list-client-bookings.input';

export abstract class IClientRepository {
  /**
   * Lista clientes simples de um provedor
   * (userId, nome, avatar, email, rank, totalBookings)
   */
  abstract findClientsByProvider(
    providerId: string,
    filter: ListClientsInput,
  ): Promise<{ data: ClientSummary[]; total: number }>;

  /**
   * Verifica se um userId é cliente do provedor
   */
  abstract isClientOfProvider(
    providerId: string,
    userId: string,
  ): Promise<boolean>;

  /**
   * Top N clientes ordenados por score
   */
  abstract findTopClients(
    providerId: string,
    limit: number,
  ): Promise<ClientSummary[]>;

  /**
   * Reservas de todos os clientes OU de um cliente específico
   */
  abstract findClientBookings(
    providerId: string,
    filter: ListClientBookingsInput,
  ): Promise<{ data: ClientBookingData[]; total: number }>;

  /**
   * Serviço mais reservado por um cliente nos serviços do provedor
   */
  abstract findFavoriteService(
    providerId: string,
    clientId: string,
  ): Promise<FavoriteServiceData | null>;

  /**
   * Top serviços favoritos do cliente (até 42)
   */
  abstract findClientTopServices(
    providerId: string,
    clientId: string,
    limit: number,
  ): Promise<FavoriteServiceData[]>;

  /**
   * Detalhes completos do cliente (estatísticas + rank)
   */
  abstract findClientDetails(
    providerId: string,
    clientId: string,
    servicesLimit: number,
  ): Promise<ClientDetailsData | null>;
}
