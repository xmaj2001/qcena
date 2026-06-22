import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClientRank } from '../../domain/entities/enums/client-rank.enum';
import { PaginatedResponse } from 'src/shared/common/envelope.response';

export class ClientSummaryResponse {
  @ApiProperty({ example: 'cm9x1a2b3c4d5e6f7g8h9i0l' })
  userId: string;

  @ApiProperty({ example: 'Xavier Jose' })
  name: string;

  @ApiPropertyOptional({ example: 'https://cdn.qcena.com/avatar.png' })
  avatarUrl: string | null;

  @ApiProperty({ example: 'xavier@qcena.com' })
  email: string;

  @ApiProperty({ example: ClientRank.GOLD, enum: ClientRank })
  rank: ClientRank;

  @ApiProperty({ example: 15 })
  totalBookings: number;
}

export const PaginatedClientSummaryResponse = PaginatedResponse(
  ClientSummaryResponse,
);
