import { RoomCategory } from 'src/rooms-category/entities/room-category.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('Room')
export class Room {
  @PrimaryColumn('varchar', { length: 20 })
  roomId: string;

  @Column('varchar', { length: 30 })
  stage: string;

  @Column('varchar', { length: 30 })
  status: string;

  @ManyToOne(() => RoomCategory)
  @JoinColumn({ name: 'roomCategoryId' })
  roomCategory: RoomCategory;

  @Column('varchar', { length: 20 })
  roomCategoryId: string;
}