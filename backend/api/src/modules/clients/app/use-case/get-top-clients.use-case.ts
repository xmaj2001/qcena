import { Injectable, Logger } from '@nestjs/common';
import { IClientRepository } from '../../domain/repo/client.repo';

@Injectable()
export class GetTopClientsUseCase {
  private readonly logger = new Logger(GetTopClientsUseCase.name);

  constructor(private readonly clientRepo: IClientRepository) {}

  async execute(providerId: string, limit: number) {
    this.logger.log(`Buscando top ${limit} clientes do provedor ${providerId}`);
    return this.clientRepo.findTopClients(providerId, limit);
  }
}
