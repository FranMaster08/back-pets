import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatevacunasDto {
  @ApiProperty({
    description: 'Nombre de la vacuna',
    example: 'Vacumm 3.0',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  name: string;

  @ApiProperty({
    description: 'Descripcion de la vacunas',
    example: 'Vacuna para el covid',
  })
  @IsString({ message: 'La descripcion debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripcion no puede estar vacía.' })
  description: string;
}
