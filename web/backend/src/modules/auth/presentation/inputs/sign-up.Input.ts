import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpInput {
  @ApiProperty({
    example: 'Xavier Jose',
    description: 'Nome completo do usuário',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Nome é obrigatório.',
  })
  name: string;

  @ApiProperty({
    example: 'xavierjs@gmail.com',
    description: 'Email do usuário',
  })
  @IsEmail(
    {},
    {
      message: 'Email inválido.',
    },
  )
  @IsNotEmpty({
    message: 'Email é obrigatório.',
  })
  email: string;

  @ApiProperty({
    example: 'Xavierjs2010#',
    description: 'Senha do usuário',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Senha é obrigatória.',
  })
  @MinLength(8, {
    message: 'Senha deve ter pelo menos 8 caracteres.',
  })
  @MaxLength(128, {
    message: 'Senha deve ter no máximo 128 caracteres.',
  })
  password: string;

  @ApiProperty({
    title: 'Lembrar-me',
    example: false,
    default: false,
    description: 'Se falso, o usuário será desconectado ao fechar o navegador.',
  })
  @IsBoolean({
    message: 'Lembrar-me deve ser um booleano.',
  })
  @IsOptional()
  rememberMe?: boolean;
}
