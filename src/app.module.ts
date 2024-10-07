import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { OwnerModule } from './owner/owner.module';
import { DogsModule } from './dogs/dogs.module';
import { VacunasModule } from './vacunas/vacunas.module';

@Module({
  imports: [DatabaseModule, OwnerModule, DogsModule, VacunasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
