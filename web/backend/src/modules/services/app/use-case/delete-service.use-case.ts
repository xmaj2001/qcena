import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IServiceRepository } from '../../domain/repo/service.repo';
import { IUserRepository } from 'src/modules/users/domain/repo/user.repo';

@Injectable()
export class DeleteServiceUseCase {
  private readonly logger = new Logger(DeleteServiceUseCase.name);
  constructor(
    private readonly serviceRepo: IServiceRepository,
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: string, providerId: string) {
    this.logger.log(`Deletando servico ${id}`);
    const user = await this.userRepo.findById(providerId);

    if (!user) {
      this.logger.warn(`Provedor nao encontrado ${providerId}`);
      throw new NotFoundException('Provedor nao encontrado');
    }

    const service = await this.serviceRepo.findById(id);
    if (!service) {
      this.logger.warn(`Servico nao encontrado ${id}`);
      throw new NotFoundException('Servico nao encontrado');
    }

    if (user.id !== service.providerId) {
      this.logger.warn(
        `Provedor ${providerId} nao tem permissao para deletar servico ${id}`,
      );
      throw new UnauthorizedException(
        'Provedor nao tem permissao para deletar servico',
      );
    }
    await this.serviceRepo.delete(id);
    this.logger.log(`Servico deletado com sucesso ${id}`);
  }
}
