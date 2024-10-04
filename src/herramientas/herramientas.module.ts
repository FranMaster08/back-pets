import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HerramientasService } from './herramientas.service';
import { HerramientasController } from './herramientas.controller';
import { Herramientas } from '../shared/entities/Herramientas.entity'; // Asegúrate de que la entidad esté en el lugar correcto
import { Categorias } from 'src/shared/entities/Categorias.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Herramientas]), // Se registra la entidad 'Herramientas' para TypeORM
    TypeOrmModule.forFeature([Categorias]),

  ],
  controllers: [HerramientasController],
  providers: [HerramientasService],
})
export class HerramientasModule {}
