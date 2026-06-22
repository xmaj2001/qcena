import { Injectable, Logger } from '@nestjs/common';
import { IClientRepository } from '../../domain/repo/client.repo';
import { ListClientsInput } from '../../presentation/inputs/list-clients.input';

@Injectable()
export class ListClientsUseCase {
  private readonly logger = new Logger(ListClientsUseCase.name);

  constructor(private readonly clientRepo: IClientRepository) {}

  async execute(providerId: string, filter: ListClientsInput) {
    this.logger.log(`Listando clientes do provedor ${providerId}`);
    const result = await this.clientRepo.findClientsByProvider(
      providerId,
      filter,
    );

    return {
      total: result.total,
      items: result.data,
    };
  }
}
