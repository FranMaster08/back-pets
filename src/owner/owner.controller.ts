import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owners } from "../shared/entities/Owners.entity";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OwnerResponseDto } from './dto/response/owner.response';


@ApiTags('Owner') // Etiqueta para agrupar los endpoints en la documentación de Swagger
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
  @ApiOperation({ summary: 'Obtener todos los Owner' })
  @ApiResponse({ status: 200, description: 'Lista de Owners.', type: [OwnerResponseDto], })
  findAll(): Promise<Owners[]> {
    return this.OwnerService.findAll();
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
