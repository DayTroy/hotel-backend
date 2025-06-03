import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from './entities/room.entity';
import { RoomCategory } from '../rooms-category/entities/room-category.entity';
import { Booking } from '../bookings/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomCategory, Booking])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
