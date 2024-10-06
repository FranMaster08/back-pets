import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { OwnerResponseDto } from './dto/response/owner.response';


@ApiTags('dueños') // Etiqueta para agrupar los endpoints en la documentación de Swagger
@Controller('Owner')
export class OwnerController {
  constructor(private readonly OwnerService: OwnerService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo Owner' }) // Describe el endpoint en Swagger
  @ApiResponse({ status: 201, description: 'Owner creado exitosamente.', type: OwnerResponseDto, })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.OwnerService.create(createOwnerDto);
  }

  
  @Get()
  @ApiOperation({ summary: 'Obtener todos los owners con filtros opcionales' })
  @ApiQuery({ name: 'name', required: false, description: 'Nombre del owner' })
  @ApiQuery({ name: 'email', required: false, description: 'email del owner' })
  @ApiQuery({ name: 'address', required: false, description: 'Address del owner' })
  @ApiQuery({ name: 'phone', required: false, description: 'Phone del owner' })
  
  @ApiResponse({
    status: 200,
    description: 'Lista de Owners obtenida exitosamente.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Error al consultar los datos',
        error: 'Internal Server Error',
      },
    },
  })

  async findAll(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('address') address?: string,
    @Query('phone') phone?: string,
  ) { 
    const filters = {};
  
    if (name) filters['name'] = name;
    if (email) filters['email'] = email;
    if (address) filters['address'] = address;
    if (phone) filters['phone'] = phone;

    return await this.OwnerService.findAll(filters);
  }
  


  @Get(':id')
  @ApiOperation({ summary: 'Obtener un Owner por ID' })
  @ApiResponse({ status: 200, description: 'Detalles del Owner.', type: [OwnerResponseDto], })
  @ApiResponse({ status: 404, description: 'Owner no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.OwnerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un Owner por ID' })
  @ApiResponse({
    status: 200,
    description: 'Owner actualizado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Owner no encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ) {
    return this.OwnerService.update(+id, updateOwnerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Owner por ID' })
  @ApiResponse({
    status: 200,
    description: 'Owner eliminado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Owner no encontrado.' })
  remove(@Param('id') id: string) {
    return this.OwnerService.remove(+id);
  }
}
