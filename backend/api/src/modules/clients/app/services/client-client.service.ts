import { Injectable } from '@nestjs/common';
import { ListClientsUseCase } from '../use-case/list-clients.use-case';
import { CheckIsClientUseCase } from '../use-case/check-is-client.use-case';
import { GetTopClientsUseCase } from '../use-case/get-top-clients.use-case';
import { ListClientBookingsUseCase } from '../use-case/list-client-bookings.use-case';
import { GetFavoriteServiceUseCase } from '../use-case/get-favorite-service.use-case';
import { GetClientDetailsUseCase } from '../use-case/get-client-details.use-case';
import {
  ListClientsInput,
  ListClientBookingsInput,
} from '../../presentation/inputs';

@Injectable()
export class ClientClientService {
  constructor(
    private readonly listClientsUseCase: ListClientsUseCase,
    private readonly checkIsClientUseCase: CheckIsClientUseCase,
    private readonly getTopClientsUseCase: GetTopClientsUseCase,
    private readonly listClientBookingsUseCase: ListClientBookingsUseCase,
    private readonly getFavoriteServiceUseCase: GetFavoriteServiceUseCase,
    private readonly getClientDetailsUseCase: GetClientDetailsUseCase,
  ) {}

  async listClients(providerId: string, filter: ListClientsInput) {
    return this.listClientsUseCase.execute(providerId, filter);
  }

  async checkIsClient(providerId: string, userId: string) {
    return this.checkIsClientUseCase.execute(providerId, userId);
  }

  async getTopClients(providerId: string, limit: number) {
    return this.getTopClientsUseCase.execute(providerId, limit);
  }

  async listClientBookings(
    providerId: string,
    filter: ListClientBookingsInput,
  ) {
    return this.listClientBookingsUseCase.execute(providerId, filter);
  }

  async getFavoriteService(providerId: string, clientId: string) {
    return this.getFavoriteServiceUseCase.execute(providerId, clientId);
  }

  async getClientDetails(
    providerId: string,
    clientId: string,
    servicesLimit: number,
  ) {
    return this.getClientDetailsUseCase.execute(
      providerId,
      clientId,
      servicesLimit,
    );
  }
}
