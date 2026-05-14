import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IBookingRepository } from '../../domain/repo/booking.repo';
import { BookingStatus } from '../../domain/entities/enums/booking-status.enum';
import { IServiceRepository } from 'src/modules/services/domain/repo/service.repo';
import { UpdateBookingInput } from '../../presentation/inputs';

@Injectable()
export class UpdateBookingUseCase {
  private readonly logger = new Logger(UpdateBookingUseCase.name);

  constructor(
    private readonly bookingRepo: IBookingRepository,
    private readonly serviceRepo: IServiceRepository,
  ) {}

  async execute(id: string, input: UpdateBookingInput, userId: string) {
    this.logger.log(
      `Atualizando agendamento ${id} para status ${input.status} pelo usuario ${userId}`,
    );

    const booking = await this.bookingRepo.findById(id);
    if (!booking) {
      this.logger.warn(`Agendamento não encontrado: ${id}`);
      throw new NotFoundException('Agendamento não encontrado');
    }

    const service = await this.serviceRepo.findById(booking.serviceId);

    const isClient = booking.clientId === userId;
    const isProvider = service?.providerId === userId;

    if (!isClient && !isProvider) {
      this.logger.warn(
        `Usuario ${userId} nao tem permissao para atualizar agendamento ${id}`,
      );
      throw new UnauthorizedException(
        'Você não tem permissão para atualizar este agendamento',
      );
    }

    // Business rules for status transitions
    if (isClient && input.status !== BookingStatus.CANCELED) {
      this.logger.warn(
        `Cliente ${userId} nao tem permissao para atualizar agendamento ${id}`,
      );
      throw new UnauthorizedException('Clients can only cancel their bookings');
    }

    if (isProvider && input.status === BookingStatus.CANCELED) {
      this.logger.warn(
        `Provider ${userId} nao tem permissao para atualizar agendamento ${id}`,
      );
      // For now let's allow it or restrict it.
    }

    booking.updateStatus(input.status);
    await this.bookingRepo.update(booking);

    this.logger.log(`Agendamento atualizado com sucesso: ${booking.id}`);
    return booking.toPersistence();
  }
}
