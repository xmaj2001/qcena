import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IClientRepository } from '../../domain/repo/client.repo';

@Injectable()
export class GetFavoriteServiceUseCase {
  private readonly logger = new Logger(GetFavoriteServiceUseCase.name);

  constructor(private readonly clientRepo: IClientRepository) {}

  async execute(providerId: string, clientId: string) {
    this.logger.log(
      `Buscando serviço favorito do cliente ${clientId} para provedor ${providerId}`,
    );

    const isClient = await this.clientRepo.isClientOfProvider(
      providerId,
      clientId,
    );
    if (!isClient) {
      throw new NotFoundException('Este utilizador não é teu cliente');
    }

    const favorite = await this.clientRepo.findFavoriteService(
      providerId,
      clientId,
    );

    if (!favorite) {
      throw new NotFoundException(
        'Nenhum serviço favorito encontrado para este cliente',
      );
    }

    return favorite;
  }
}
