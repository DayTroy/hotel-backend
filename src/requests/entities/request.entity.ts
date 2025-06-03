import { Guest } from 'src/guests/entities/guest.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('Request')
export class Request {
  @PrimaryColumn('varchar', { length: 20 })
  requestId: string;

  @Column('varchar', { length: 30 })
  status: string;

  @Column('date')
  dateIn: Date;

  @Column('date')
  dateOut: Date;

  @Column('varchar', { length: 100 })
  description: string;

  @Column('date')
  creationDate: Date;

  @ManyToOne(() => Guest)
  @JoinColumn({ name: 'guestId' })
  guest: Guest;

  @Column('char')
  guestId: string;
}