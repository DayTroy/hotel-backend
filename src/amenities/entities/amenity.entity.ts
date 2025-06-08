import { ProvidedAmenity } from 'src/provided-amenities/entities/provided-amenity.entity';
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('Amenity')
export class Amenity {
  @PrimaryColumn('varchar', { length: 20 })
  amenityId: string;

  @Column('varchar', { length: 100 })
  amenityTitle: string;

  @Column('numeric', { precision: 10, scale: 2 })
  amenityPrice: number;

  @OneToMany(() => ProvidedAmenity, (providedAmenity) => providedAmenity.amenity)
  providedAmenities: ProvidedAmenity[];
} 