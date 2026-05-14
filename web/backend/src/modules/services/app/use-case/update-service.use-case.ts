import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IServiceRepository } from '../../domain/repo/service.repo';
import { ServiceStatus } from '../../domain/entities/enums/service-status.enum';
import { IUserRepository } from 'src/modules/accounts/domain/repo/user.repo';

interface UpdateServiceInput {
  id: string;
  name?: string;
  description?: string;
  category?: string;
  tags?: string[];
  price?: number;
  images?: string[];
  status?: ServiceStatus;
}

@Injectable()
export class UpdateServiceUseCase {
  private readonly logger = new Logger(UpdateServiceUseCase.name);
  constructor(
    private readonly serviceRepo: IServiceRepository,
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: UpdateServiceInput, providerId: string) {
    this.logger.log(`Atualizando servico ${input.id}`);
    const user = await this.userRepo.findById(providerId);
    if (!user) {
      this.logger.warn(`Provedor nao encontrado ${providerId}`);
      throw new NotFoundException('Provedor nao encontrado');
    }
    const service = await this.serviceRepo.findById(input.id);
    if (!service) {
      this.logger.warn(`Servico nao encontrado ${input.id}`);
      throw new NotFoundException('Serviço não encontrado');
    }

    if (user.id !== service.providerId) {
      this.logger.warn(
        `Provedor ${providerId} nao tem permissao para atualizar servico ${input.id}`,
      );
      throw new UnauthorizedException(
        'Provedor nao tem permissao para atualizar servico',
      );
    }
    service.update(input);
    await this.serviceRepo.update(service);
    return service.toPersistence();
  }
}
