import { Module } from '@nestjs/common';
import { RoomsCategoryService } from './rooms-category.service';
import { RoomsCategoryController } from './rooms-category.controller';
import { RoomCategory } from './entities/room-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoomCategory])],
  controllers: [RoomsCategoryController],
  providers: [RoomsCategoryService],
})
export class RoomsCategoryModule {}
