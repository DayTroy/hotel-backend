import { Room } from 'src/rooms/entities/room.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity('RoomCategory')
export class RoomCategory {
  @PrimaryColumn('varchar', { length: 20 })
  roomCategoryId: string;

  @Column('varchar', { length: 30 })
  title: string;

  @Column('varchar', { length: 30 })
  pricePerNight: string;

  @Column('varchar', { length: 30 })
  description: string;

  @Column('varchar', { length: 30 })
  capacity: string;

  @OneToMany(() => Room, room => room.roomCategory)
  room: Room[];
}