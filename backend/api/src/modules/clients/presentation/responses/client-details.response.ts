import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClientRank } from '../../domain/entities/enums/client-rank.enum';
import { FavoriteServiceResponse } from './favorite-service.response';
import { SuccessResponse } from 'src/shared/common/envelope.response';

export class ClientDetailsResponse {
  @ApiProperty({ example: 'cm9x1a2b3c4d5e6f7g8h9i0l' })
  userId: string;

  @ApiProperty({ example: 'Xavier Jose' })
  name: string;

  @ApiPropertyOptional({ example: 'https://cdn.qcena.com/avatar.png' })
  avatarUrl: string | null;

  @ApiPropertyOptional({ example: 'MALE' })
  gender: string | null;

  @ApiProperty({ type: [FavoriteServiceResponse] })
  favoriteServices: FavoriteServiceResponse[];

  @ApiProperty({
    example: 12,
    description: 'Total de reservas com status COMPLETED',
  })
  totalCompleted: number;

  @ApiProperty({ example: 2, description: 'Total de reservas canceladas' })
  totalCanceled: number;

  @ApiProperty({ example: 3, description: 'Total de reservas pendentes' })
  totalPending: number;

  @ApiProperty({
    example: 150000,
    description: 'Soma do totalPrice das reservas COMPLETED',
  })
  totalSpent: number;

  @ApiProperty({ example: ClientRank.GOLD, enum: ClientRank })
  rank: ClientRank;
}

export const SingleClientDetailsResponse = SuccessResponse(
  ClientDetailsResponse,
);
