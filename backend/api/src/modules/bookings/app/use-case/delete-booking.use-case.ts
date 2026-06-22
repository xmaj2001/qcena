import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IBookingRepository } from '../../domain/repo/booking.repo';
import { BookingStatus } from '../../domain/entities/enums/booking-status.enum';

@Injectable()
export class DeleteBookingUseCase {
  private readonly logger = new Logger(DeleteBookingUseCase.name);

  constructor(private readonly bookingRepo: IBookingRepository) {}

  async execute(id: string, userId: string) {
    this.logger.log(`Removendo agendamento ${id} do usuario ${userId}`);

    const booking = await this.bookingRepo.findById(id);
    if (!booking) {
      this.logger.warn(`Agendamento não encontrado: ${id}`);
      throw new NotFoundException('Agendamento não encontrado');
    }

    if (booking.clientId !== userId) {
      this.logger.warn(
        `Usuario ${userId} nao tem permissao para deletar agendamento ${id}`,
      );
      throw new UnauthorizedException(
        'Apenas o cliente pode deletar o registro do seu agendamento',
      );
    }

    if (booking.status !== BookingStatus.PENDING) {
      this.logger.warn(
        `Agendamento ${id} nao pode ser deletado pois nao esta pendente`,
      );
      throw new BadRequestException(
        'Apenas agendamento pendente pode ser deletado',
      );
    }

    await this.bookingRepo.delete(id);
    this.logger.log(`Agendamento deletado com sucesso: ${id}`);
  }
}
