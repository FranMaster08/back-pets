import { Module } from '@nestjs/common';
import { vacunasService } from './vacunas.service';
import { vacunasController } from './vacunas.controller';
import { Vaccines } from 'src/shared/entities/Vaccines.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccines])],

  controllers: [vacunasController],
  providers: [vacunasService],
})
export class VacunasModule {}
