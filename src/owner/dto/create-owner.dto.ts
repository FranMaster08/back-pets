import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOwnerDto {
  @ApiProperty({
    description: 'Nombre del Owner',
    example: 'Alberto Arrieta',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  name: string;

  @ApiProperty({
    description: 'Email del Owner',
    example: 'owner@example.com',
  })
  @IsString({ message: 'El email debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El email no puede estar vacío.' })
  email: string;

  @ApiProperty({
    description: 'Address del Owner',
    example: 'calle 123 # 2 - 4',
  })
  @IsString({ message: 'La Address debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La Address no puede estar vacía.' })
  address: string;

  @ApiProperty({
    description: 'Phone del Owner',
    example: '3023525802',
  })
  @IsString({ message: 'El Phone debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El Phone no puede estar vacío.' })
  phone: string;
}
