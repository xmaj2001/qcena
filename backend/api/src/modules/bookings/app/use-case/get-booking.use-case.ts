import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IBookingRepository } from '../../domain/repo/booking.repo';
import { IServiceRepository } from 'src/modules/services/domain/repo/service.repo';
import { Logger } from '@nestjs/common';

@Injectable()
export class GetBookingUseCase {
  private readonly logger = new Logger(GetBookingUseCase.name);

  constructor(
    private readonly bookingRepo: IBookingRepository,
    private readonly serviceRepo: IServiceRepository,
  ) {}

  async execute(id: string, userId: string) {
    const booking = await this.bookingRepo.findById(id);
    if (!booking) {
      this.logger.warn(`Agendamento não encontrado: ${id}`);
      throw new NotFoundException('Agendamento não encontrado');
    }

    const service = await this.serviceRepo.findById(booking.serviceId);

    if (booking.clientId !== userId && service?.providerId !== userId) {
      this.logger.warn(
        `Usuario ${userId} nao tem permissao para acessar agendamento ${id}`,
      );
      throw new UnauthorizedException(
        'Voce nao tem permissao para acessar este agendamento',
      );
    }

    this.logger.log(`Agendamento ${id} acessado com sucesso por ${userId}`);
    return booking.toPersistence();
  }
}
