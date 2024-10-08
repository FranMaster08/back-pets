import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { vacunasService } from './vacunas.service';
import { CreatevacunasDto } from './dto/create-vacuna.dto';
import { UpdatevacunasDto } from './dto/update-vacuna.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { vacunasResponseDto } from './dto/response/vacunas.response';

@ApiTags('vacunas') // Etiqueta para agrupar los endpoints en la documentación de Swagger
@Controller('vacunas')
export class vacunasController {
  constructor(private readonly vacunasService: vacunasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva vacuna' }) // Describe el endpoint en Swagger
  @ApiResponse({
    status: 201,
    description: 'Vacuna creada exitosamente.',
    type: vacunasResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  create(@Body() createvacunasDto: CreatevacunasDto) {
    return this.vacunasService.create(createvacunasDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las vacunas con filtros opcionales' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Nombre de la vacuna',
  })
  @ApiQuery({
    name: 'description',
    required: false,
    description: 'Description de la vacuna',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de vacunas obtenida exitosamente.',
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
    @Query('description') description?: string,
  ) {
    const filters = {};

    if (name) filters['name'] = name;
    if (description) filters['description'] = description;

    return await this.vacunasService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una vacuna por ID' })
  @ApiResponse({
    status: 200,
    description: 'Detalles de la vacuna.',
    type: [vacunasResponseDto],
  })
  @ApiResponse({ status: 404, description: 'vacuna no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.vacunasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una vacuna por ID' })
  @ApiResponse({
    status: 200,
    description: 'Vacuna actualizada exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'vacuna no encontrada.' })
  update(@Param('id') id: string, @Body() updatevacunasDto: UpdatevacunasDto) {
    return this.vacunasService.update(+id, updatevacunasDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una vacuna por ID' })
  @ApiResponse({
    status: 200,
    description: 'vacuna eliminada exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'vacuna no encontrada.' })
  remove(@Param('id') id: string) {
    return this.vacunasService.remove(+id);
  }
}
