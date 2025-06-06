import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './entities/booking.entity';
import { BookingGuest } from './entities/booking-guest.entity';
import { ProvidedAmenity } from '../provided-amenities/entities/provided-amenity.entity';
import { Guest } from '../guests/entities/guest.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, BookingGuest, ProvidedAmenity, Guest]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
