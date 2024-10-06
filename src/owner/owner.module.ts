import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { Owners } from 'src/shared/entities/Owners.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Owners])],

  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
