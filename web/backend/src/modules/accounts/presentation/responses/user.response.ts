import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserGenderEnum } from '../../domain/entites/enums/user.gender.enum';
import {
  PaginatedResponse,
  SuccessArrayResponse,
} from 'src/shared/responses/envelope.response';

export class UserResponse {
  @ApiProperty({ example: 'cm9x1a2b3c4d5e6f7g8h9i0j' })
  id: string;

  @ApiProperty({ example: 'Xavier Jose' })
  name: string;

  @ApiProperty({ example: 'xavier@qcena.com' })
  email: string;

  @ApiProperty({ example: false })
  emailVerified: boolean;

  @ApiPropertyOptional({ example: 'https://cdn.qcena.com/avatar.png' })
  image: string | null;

  @ApiPropertyOptional({
    example: UserGenderEnum.MALE,
    enum: UserGenderEnum,
  })
  gender: UserGenderEnum | null;

  @ApiPropertyOptional({ example: '2001-05-13T00:00:00.000Z' })
  birthDate: string | null;

  @ApiProperty({ example: '2026-01-01T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-05-13T10:00:00.000Z' })
  updatedAt: Date;
}

export const PaginatedUsersResponse = PaginatedResponse(UserResponse);
export const SuccessUsersResponse = SuccessArrayResponse(UserResponse);
