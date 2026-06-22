import { Injectable, Logger } from '@nestjs/common';
import { IClientRepository } from '../../domain/repo/client.repo';

@Injectable()
export class CheckIsClientUseCase {
  private readonly logger = new Logger(CheckIsClientUseCase.name);

  constructor(private readonly clientRepo: IClientRepository) {}

  async execute(providerId: string, userId: string) {
    this.logger.log(
      `Verificando se user ${userId} é cliente do provedor ${providerId}`,
    );
    const isClient = await this.clientRepo.isClientOfProvider(
      providerId,
      userId,
    );
    return { isClient };
  }
}
