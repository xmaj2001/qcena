import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBookingInput {
  @ApiProperty({
    example: 'cm9x1a2b3c4d5e6f7g8h9i0j',
    description: 'ID do serviço a ser reservado',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'ID do serviço é obrigatorio' })
  serviceId: string;
}
