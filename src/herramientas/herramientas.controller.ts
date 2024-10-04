import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HerramientasService } from './herramientas.service';
import { CreateHerramientaDto } from './dto/create-herramienta.dto';
import { UpdateHerramientaDto } from './dto/update-herramienta.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Herramientas } from '../shared/entities/Herramientas.entity';
import { HerramientasResponseDto } from './dto/response/herramientas.response';


@ApiTags('herramientas') // Etiqueta para agrupar los endpoints en la documentación de Swagger
@Controller('herramientas')
export class HerramientasController {
  constructor(private readonly herramientasService: HerramientasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva Herramienta' }) // Describe el endpoint en Swagger
  @ApiResponse({ status: 201, description: 'Herramienta creada exitosamente.', type: HerramientasResponseDto, })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  create(@Body() createHerramientaDto: CreateHerramientaDto) {
    return this.herramientasService.create(createHerramientaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las Herramientas' })
  @ApiResponse({ status: 200, description: 'Lista de Herramientas.', type: [HerramientasResponseDto], })
  findAll(): Promise<Herramientas[]> {
    return this.herramientasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una Herramienta por ID' })
  @ApiResponse({ status: 200, description: 'Detalles de la Herramienta.', type: [HerramientasResponseDto], })
  @ApiResponse({ status: 404, description: 'Herramienta no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.herramientasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una Herramienta por ID' })
  @ApiResponse({
    status: 200,
    description: 'Herramienta actualizada exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Herramienta no encontrada.' })
  update(
    @Param('id') id: string,
    @Body() updateHerramientaDto: UpdateHerramientaDto,
  ) {
    return this.herramientasService.update(+id, updateHerramientaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una Herramienta por ID' })
  @ApiResponse({
    status: 200,
    description: 'Herramienta eliminada exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Herramienta no encontrada.' })
  remove(@Param('id') id: string) {
    return this.herramientasService.remove(+id);
  }
}
