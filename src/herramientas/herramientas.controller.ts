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
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('herramientas') // Etiqueta para agrupar los endpoints en la documentación de Swagger
@Controller('herramientas')
export class HerramientasController {
  constructor(private readonly herramientasService: HerramientasService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una herramienta',
    description:
      'Crea una nueva herramienta en el sistema utilizando los datos proporcionados en el cuerpo de la solicitud.',
  })
  create(@Body() createHerramientaDto: CreateHerramientaDto) {
    return this.herramientasService.create(createHerramientaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las herramientas',
    description:
      'Devuelve una lista de todas las herramientas registradas en el sistema.',
  })
  findAll() {
    return this.herramientasService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una herramienta específica',
    description:
      'Busca una herramienta por su ID y devuelve los detalles de esa herramienta.',
  })
  @ApiParam({ name: 'id', description: 'ID de la herramienta a buscar' }) // Descripción del parámetro de la ruta
  findOne(@Param('id') id: string) {
    return this.herramientasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una herramienta',
    description:
      'Actualiza los datos de una herramienta existente en el sistema usando su ID y los datos proporcionados en el cuerpo de la solicitud.',
  })
  @ApiParam({ name: 'id', description: 'ID de la herramienta a actualizar' })
  update(
    @Param('id') id: string,
    @Body() updateHerramientaDto: UpdateHerramientaDto,
  ) {
    return this.herramientasService.update(+id, updateHerramientaDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una herramienta',
    description: 'Elimina una herramienta del sistema utilizando su ID.',
  })
  @ApiParam({ name: 'id', description: 'ID de la herramienta a eliminar' })
  remove(@Param('id') id: string) {
    return this.herramientasService.remove(+id);
  }
}
