import { Injectable, Logger } from '@nestjs/common';
import { IClientRepository } from '../../domain/repo/client.repo';
import { ListClientBookingsInput } from '../../presentation/inputs/list-client-bookings.input';

@Injectable()
export class ListClientBookingsUseCase {
  private readonly logger = new Logger(ListClientBookingsUseCase.name);

  constructor(private readonly clientRepo: IClientRepository) {}

  async execute(providerId: string, filter: ListClientBookingsInput) {
    this.logger.log(
      `Listando reservas dos clientes do provedor ${providerId}` +
        (filter.clientId ? ` (cliente: ${filter.clientId})` : ''),
    );
    return this.clientRepo.findClientBookings(providerId, filter);
  }
}
