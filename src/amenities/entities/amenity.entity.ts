import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Amenity')
export class Amenity {
  @PrimaryColumn('varchar', { length: 20 })
  amenityId: string;

  @Column('varchar', { length: 100 })
  amenityTitle: string;

  @Column('numeric', { precision: 10, scale: 2 })
  amenityPrice: number;
} 