import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { UserGenderEnum } from '../../domain/entites/enums/user.gender.enum';

export class UpdateAccountInput {
  @ApiPropertyOptional({
    example: 'Xavier Jose',
    description: 'Nome do usuário',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    enum: UserGenderEnum,
    example: UserGenderEnum.MALE,
    description: 'Gênero do usuário',
  })
  @IsEnum(UserGenderEnum, { message: 'Género inválido' })
  @IsOptional()
  gender?: UserGenderEnum;

  @ApiPropertyOptional({
    example: '2001-05-13',
    description: 'Data de nascimento do usuário',
  })
  @IsDateString({}, { message: 'Data de nascimento inválida' })
  @IsOptional()
  birthDate?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.qcena.com/avatar.png',
    description: 'URL da imagem do usuário',
  })
  @IsUrl({}, { message: 'Imagem inválida' })
  @IsOptional()
  image?: string;
}
