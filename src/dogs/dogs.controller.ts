import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto, VaccineDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('mascotas')
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post('vaccine-dog')
  @ApiOperation({ summary: 'Vacunar un nuevo perro' })
  @ApiResponse({
    status: 201,
    description: 'El perro ha sido vacunado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error de validación. Faltan campos obligatorios.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed: El campo nombre es obligatorio',
        error: 'Bad Request',
      },
    },
  })
  async vaccine(@Body() vaccineDto: VaccineDogDto) {
    return await this.dogsService.vaccine(vaccineDto);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo perro' })
  @ApiResponse({
    status: 201,
    description: 'El perro ha sido creado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error de validación. Faltan campos obligatorios.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed: El campo nombre es obligatorio',
        error: 'Bad Request',
      },
    },
  })
  async create(@Body() createDogDto: CreateDogDto) {
    return await this.dogsService.create(createDogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los perros con filtros opcionales' })
  @ApiQuery({ name: 'name', required: false, description: 'Nombre del perro' })
  @ApiQuery({
    name: 'breedId',
    required: false,
    description: 'ID de la raza del perro',
    type: Number,
  })
  @ApiQuery({
    name: 'ownerId',
    required: false,
    description: 'ID del dueño del perro',
    type: Number,
  })
  @ApiQuery({ name: 'color', required: false, description: 'Color del perro' })
  @ApiQuery({
    name: 'personalityId',
    required: false,
    description: 'ID de la personalidad del perro',
    type: Number,
  })
  @ApiQuery({
    name: 'vaccineId',
    required: false,
    description: 'ID de la vacuna del perro',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de perros obtenida exitosamente.',
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
    @Query('breedId') breedId?: number,
    @Query('ownerId') ownerId?: number,
    @Query('color') color?: string,
    @Query('personalityId') personalityId?: number,
  ) {
    const filters = { name, breedId, ownerId, color, personalityId };
    return await this.dogsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un perro por ID' })
  @ApiParam({ name: 'id', description: 'ID del perro', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Perro encontrado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Perro no encontrado.',
    schema: {
      example: {
        statusCode: 404,
        message: 'El perro con ID 1 no fue encontrado',
        error: 'Not Found',
      },
    },
  })
  async findOne(@Param('id') id: string) {
    const dog = await this.dogsService.findOne(+id);
    if (!dog) {
      throw new HttpException(
        `El perro con ID ${id} no fue encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }
    return dog;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un perro por ID' })
  @ApiParam({ name: 'id', description: 'ID del perro', type: Number })
  @ApiResponse({
    status: 200,
    description: 'El perro ha sido actualizado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Perro no encontrado para actualizar.',
    schema: {
      example: {
        statusCode: 404,
        message: 'El perro con ID 1 no fue encontrado',
        error: 'Not Found',
      },
    },
  })
  async update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    const updatedDog = await this.dogsService.update(+id, updateDogDto);
    if (!updatedDog) {
      throw new HttpException(
        `El perro con ID ${id} no fue encontrado para actualizar`,
        HttpStatus.NOT_FOUND,
      );
    }
    return updatedDog;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un perro por ID' })
  @ApiParam({ name: 'id', description: 'ID del perro', type: Number })
  @ApiResponse({
    status: 200,
    description: 'El perro ha sido eliminado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Perro no encontrado para eliminar.',
    schema: {
      example: {
        statusCode: 404,
        message: 'El perro con ID 1 no fue encontrado para eliminar',
        error: 'Not Found',
      },
    },
  })
  async remove(@Param('id') id: string) {
    const removedDog = await this.dogsService.remove(+id);
    if (!removedDog) {
      throw new HttpException(
        `El perro con ID ${id} no fue encontrado para eliminar`,
        HttpStatus.NOT_FOUND,
      );
    }
    return removedDog;
  }
}
