import { Guest } from 'src/guests/entities/guest.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  requestId: number;

  @Column({ length: 100 })
  status: string;

  @Column({ length: 30 })
  phoneNumber: string;

  @Column()
  dateIn: Date;

  @Column()
  dateOut: Date;

  @Column()
  description: string;

  @ManyToOne(() => Guest)
  @JoinColumn({ name: 'guestId' })
  guest: Guest;

  @Column()
  guestId: number;
}