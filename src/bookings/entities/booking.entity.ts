import { Room } from 'src/rooms/entities/room.entity';
import { Guest } from 'src/guests/entities/guest.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProvidedAmenity } from 'src/provided-amenities/entities/provided-amenity.entity';
import { BookingGuest } from './booking-guest.entity';

@Entity('Booking')
export class Booking {
  @PrimaryColumn('varchar', { length: 20 })
  bookingId: string;

  @Column('date')
  checkInDate: Date;

  @Column('date')
  checkOutDate: Date;

  @Column('varchar', { length: 30 })
  status: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  totalPrice: number;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @Column('varchar', { length: 20 })
  roomId: string;

  @OneToMany(() => ProvidedAmenity, providedAmenity => providedAmenity.booking, {
    cascade: true
  })
  providedAmenities: ProvidedAmenity[];

  @OneToMany(() => BookingGuest, bookingGuest => bookingGuest.booking, {
    cascade: true
  })
  bookingGuests: BookingGuest[];
} 