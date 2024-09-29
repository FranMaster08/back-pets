import { Module } from '@nestjs/common';
import { HerramientasModule } from './herramientas/herramientas.module';

@Module({
  imports: [HerramientasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
