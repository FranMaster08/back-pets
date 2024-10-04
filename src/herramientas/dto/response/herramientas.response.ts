import { ApiProperty } from '@nestjs/swagger';

export class HerramientasResponseDto {
  @ApiProperty({
    description: 'ID de la herramienta',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre de la herramienta',
    example: 'pinza',
  })
  nombre: string;

  @ApiProperty({
    description: 'peso de la herramienta',
    example: '3.5',
  })
  peso: number;

  @ApiProperty({
    description: 'Id de la categoria',
    example: '2',
  })
  idcategoria: number;



}
