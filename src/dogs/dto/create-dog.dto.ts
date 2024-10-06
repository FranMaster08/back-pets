import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  IsNumber,
  IsUrl,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class CreateDogDto {
  @ApiProperty({
    description: 'Nombre del perro',
    example: 'Firulais',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  name: string;

  @ApiProperty({
    description: 'Edad del perro en años',
    example: 3,
  })
  @IsInt()
  @Min(0, { message: 'La edad debe ser mayor o igual a 0.' })
  @Max(25, { message: 'La edad no puede ser mayor a 25 años.' })
  age: number;

  @ApiProperty({
    description: 'Peso del perro en kilogramos (como cadena de texto)',
    example: '12.5',
  })
  @IsString()
  @IsNotEmpty({ message: 'El peso es obligatorio.' })
  weight: string; // Ajustado a 'string' para que coincida con la entidad

  @ApiProperty({
    description: 'Altura del perro en centímetros (como cadena de texto)',
    example: '45.2',
  })
  @IsString()
  @IsNotEmpty({ message: 'La altura es obligatoria.' })
  height: string; // Ajustado a 'string' para que coincida con la entidad

  @ApiProperty({
    description: 'Color del pelaje del perro',
    example: 'Marrón',
  })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({
    description: 'URL de la fotografía del perro',
    example: 'https://bucket.example.com/firulais.jpg',
  })
  @IsUrl({}, { message: 'La URL de la fotografía debe ser válida.' })
  @IsOptional()
  photo_url?: string;

  @ApiProperty({
    description: 'ID del dueño del perro',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty({ message: 'El ID del dueño es obligatorio.' })
  owner_id: number;

  @ApiProperty({
    description: 'ID de la personalidad del perro',
    example: 2,
  })
  @IsInt()
  @IsNotEmpty({ message: 'El ID de la personalidad es obligatorio.' })
  personality_id: number;

  @ApiProperty({
    description: 'ID de la raza del perro',
    example: 3,
  })
  @IsInt()
  @IsNotEmpty({ message: 'El ID de la raza es obligatorio.' })
  breed_id: number;
}
