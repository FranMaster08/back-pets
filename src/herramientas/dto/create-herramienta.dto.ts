import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHerramientaDto {
  @ApiProperty({
    description: 'Nombre de la herramienta',
    example: 'Martillo',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  name: string;

  @ApiProperty({
    description: 'Peso de la herramienta en kilogramos',
    example: 1.5,
  })
  @IsNumber({}, { message: 'El peso debe ser un número.' })
  @Min(0.1, { message: 'El peso debe ser mayor a 0.' }) // Validación: el peso debe ser mayor que 0
  @Type(() => Number) // Convierte el valor a número si es necesario
  peso: number;

  @ApiPropertyOptional({
    description: 'Categoría de la herramienta, opcional',
    example: 'Construcción',
  })
  @IsString({ message: 'La categoría debe ser una cadena de texto.' })
  @IsOptional()
  categoria?: string;
}
