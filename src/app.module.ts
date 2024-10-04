import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { OwnerModule } from './owner/owner.module';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [DatabaseModule, OwnerModule, DogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
