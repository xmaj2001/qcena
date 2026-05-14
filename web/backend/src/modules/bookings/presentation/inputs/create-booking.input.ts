import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBookingInput {
  @ApiProperty({
    example: 'cm9x1a2b3c4d5e6f7g8h9i0j',
    description: 'ID do serviço a ser reservado',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'ID do serviço é obrigatorio' })
  serviceId: string;

  @ApiProperty({
    example: '2026-06-01T14:00:00.000Z',
    description: 'Data e hora agendada para o serviço',
  })
  @IsDateString({}, { message: 'Data e hora do agendamento invalida' })
  @IsNotEmpty({ message: 'Data e hora do agendamento sao obrigatorias' })
  scheduledAt: Date;
}
