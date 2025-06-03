import { Room } from 'src/rooms/entities/room.entity';
import { Guest } from 'src/guests/entities/guest.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Booking')
export class Booking {
  @PrimaryColumn('varchar', { length: 20 })
  bookingId: string;

  @Column('date')
  checkIn: Date;

  @Column('date')
  checkOut: Date;

  @Column('varchar', { length: 30 })
  status: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  totalPrice: number;

  @Column('int', { nullable: true })
  numberOfGuests: number;

  @Column('varchar', { length: 500, nullable: true })
  specialRequests: string;

  @Column('varchar', { length: 50, nullable: true })
  paymentStatus: string;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @Column('varchar', { length: 20 })
  roomId: string;

  @ManyToOne(() => Guest)
  @JoinColumn({ name: 'guestId' })
  guest: Guest;

  @Column('varchar', { length: 20 })
  guestId: string;
} 