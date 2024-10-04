import { ApiProperty } from '@nestjs/swagger';

export class CategoriasResponseDto {
  @ApiProperty({
    description: 'ID de la categoría',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Construccion',
  })
  nombre: string;
}
