import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IClientRepository } from '../../domain/repo/client.repo';

@Injectable()
export class GetClientDetailsUseCase {
  private readonly logger = new Logger(GetClientDetailsUseCase.name);

  constructor(private readonly clientRepo: IClientRepository) {}

  async execute(
    providerId: string,
    clientId: string,
    servicesLimit: number = 5,
  ) {
    this.logger.log(
      `Buscando detalhes do cliente ${clientId} para provedor ${providerId}`,
    );

    const details = await this.clientRepo.findClientDetails(
      providerId,
      clientId,
      servicesLimit,
    );

    if (!details) {
      throw new NotFoundException(
        'Cliente não encontrado ou não é teu cliente',
      );
    }

    return details;
  }
}
