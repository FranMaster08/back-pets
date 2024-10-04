import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categorias } from '../shared/entities/Categorias.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categorias]), // Importamos la entidad Categoria para este módulo
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
