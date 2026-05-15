import { ApiProperty } from '@nestjs/swagger';

export class FavoriteServiceResponse {
  @ApiProperty({ example: 'cm9x1a2b3c4d5e6f7g8h9i0k' })
  serviceId: string;

  @ApiProperty({ example: 'Corte de Cabelo' })
  serviceName: string;

  @ApiProperty({ example: 'Barbearia' })
  category: string;

  @ApiProperty({ example: 8 })
  timesBooked: number;
}
