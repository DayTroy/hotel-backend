import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Amenity } from 'src/amenities/entities/amenity.entity';

@Entity('ProvidedAmenity')
export class ProvidedAmenity {
  @PrimaryGeneratedColumn('uuid')
  providedAmenityId: string;

  @ManyToOne(() => Booking)
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;

  @Column('uuid')
  bookingId: string;

  @ManyToOne(() => Amenity)
  @JoinColumn({ name: 'amenityId' })
  amenity: Amenity;

  @Column('varchar', { length: 20 })
  amenityId: string;

  @Column('int')
  quantity: number;

  @Column('varchar', { length: 30 })
  totalPrice: string;
} 