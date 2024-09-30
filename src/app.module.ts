import { Module } from '@nestjs/common';
import { HerramientasModule } from './herramientas/herramientas.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [HerramientasModule, CategoriasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
