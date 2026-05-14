import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IBookingRepository } from '../../domain/repo/booking.repo';
import { BookingEntity } from '../../domain/entities/booking.entity';
import { IServiceRepository } from 'src/modules/services/domain/repo/service.repo';
import { IUserRepository } from 'src/modules/accounts/domain/repo/user.repo';
import { CreateBookingInput } from '../../presentation/inputs';

@Injectable()
export class CreateBookingUseCase {
  private readonly logger = new Logger(CreateBookingUseCase.name);

  constructor(
    private readonly bookingRepo: IBookingRepository,
    private readonly serviceRepo: IServiceRepository,
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: CreateBookingInput, clientId: string) {
    this.logger.log(
      `Criando agendamento para servico ${input.serviceId} por cliente ${clientId}`,
    );

    const service = await this.serviceRepo.findById(input.serviceId);
    if (!service) {
      this.logger.warn(`Servico nao encontrado: ${input.serviceId}`);
      throw new NotFoundException('Servico nao encontrado');
    }

    if (service.providerId === clientId) {
      this.logger.warn(
        `Cliente ${clientId} tentou agendar seu proprio servico ${input.serviceId}`,
      );
      throw new BadRequestException(
        'Voce nao pode agendar seu proprio servico',
      );
    }

    const client = await this.userRepo.findById(clientId);
    if (!client) {
      this.logger.warn(`Cliente nao encontrado: ${clientId}`);
      throw new NotFoundException('Cliente nao encontrado');
    }

    const booking = BookingEntity.create({
      serviceId: input.serviceId,
      clientId: clientId,
      scheduledAt: input.scheduledAt,
      totalPrice: service.price,
    });

    await this.bookingRepo.create(booking);
    this.logger.log(`Agendamento criado com sucesso: ${booking.id}`);

    return booking.toPersistence();
  }
}
