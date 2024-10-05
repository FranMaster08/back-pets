import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { Breeds } from 'src/shared/entities/Breeds.entity';
import { Dogs } from 'src/shared/entities/Dogs.entity';
import { Owners } from 'src/shared/entities/Owners.entity';
import { Personalities } from 'src/shared/entities/Personalities.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Dogs, Owners, Breeds, Personalities])], // Importa todas las entidades necesarias
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
