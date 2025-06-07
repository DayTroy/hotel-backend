import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CleaningsService } from './cleanings.service';
import { CleaningsController } from './cleanings.controller';
import { Cleaning } from './entities/cleaning.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cleaning])],
  controllers: [CleaningsController],
  providers: [CleaningsService],
})
export class CleaningsModule {}
