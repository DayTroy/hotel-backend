import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Booking } from './booking.entity';
import { Guest } from '../../guests/entities/guest.entity';

@Entity('BookingGuest')
export class BookingGuest {
  @PrimaryGeneratedColumn('uuid')
  bookingGuestId: string;

  @ManyToOne(() => Booking, booking => booking.bookingGuests)
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;

  @Column()
  bookingId: string;

  @ManyToOne(() => Guest, guest => guest.bookingGuests)
  @JoinColumn({ name: 'guestId' })
  guest: Guest;

  @Column()
  guestId: string;
} 