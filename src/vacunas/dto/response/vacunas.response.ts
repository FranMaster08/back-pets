import { ApiProperty } from '@nestjs/swagger';

export class vacunasResponseDto {
  @ApiProperty({
    description: 'ID de la vacuna',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre de la vacuna',
    example: 'Vacumm 3.0',
  })
  name: string;

  @ApiProperty({
    description: 'Informacion de la vacuna',
    example: 'vacuna para el covid',
  })
  description: string;
}
