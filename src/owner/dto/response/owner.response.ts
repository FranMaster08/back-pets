import { ApiProperty } from '@nestjs/swagger';

export class OwnerResponseDto {
  @ApiProperty({
    description: 'ID del Owner',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre del Owner',
    example: 'Alberto Arrieta',
  })
  name: string;

  @ApiProperty({
    description: 'Email del Owner',
    example: 'owner@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Address del Owner',
    example: 'Calle 1 # 20 - 30',
  })
  address: string;

  @ApiProperty({
    description: 'Phone del Owner',
    example: '3023525803',
  })
  phone: string;
}
