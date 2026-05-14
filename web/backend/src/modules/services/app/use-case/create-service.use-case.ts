import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IServiceRepository } from '../../domain/repo/service.repo';
import { ServiceEntity } from '../../domain/entities/service.entity';
import { CreateServiceInput } from '../../presentation/inputs';
import { IUserRepository } from 'src/modules/accounts/domain/repo/user.repo';

@Injectable()
export class CreateServiceUseCase {
  private readonly logger = new Logger(CreateServiceUseCase.name);
  constructor(
    private readonly serviceRepository: IServiceRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: CreateServiceInput, providerId: string) {
    this.logger.log(`Criando servico para o provider ${providerId}`);
    const user = await this.userRepository.findById(providerId);
    if (!user) {
      this.logger.warn(`Provedor não encontrado ${providerId}`);
      throw new NotFoundException('Provedor não encontrado');
    }
    const service = ServiceEntity.create({ ...input, providerId: providerId });
    await this.serviceRepository.create(service);
    this.logger.log(`Servico criado com sucesso ${service.id}`);
    return service.toPersistence();
  }
}
