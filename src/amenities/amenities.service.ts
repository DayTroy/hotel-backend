import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Amenity } from './entities/amenity.entity';

@Injectable()
export class AmenitiesService {
  constructor(
    @InjectRepository(Amenity)
    private amenitiesRepository: Repository<Amenity>,
  ) {}

  async findAll(): Promise<Amenity[]> {
    return this.amenitiesRepository.find();
  }

  async findOne(amenityId: string): Promise<Amenity | null> {
    return this.amenitiesRepository.findOne({ where: { amenityId } });
  }

  async create(amenity: Partial<Amenity>): Promise<Amenity> {
    const newAmenity = this.amenitiesRepository.create(amenity);
    return this.amenitiesRepository.save(newAmenity);
  }

  async update(amenityId: string, amenity: Partial<Amenity>): Promise<Amenity | null> {
    await this.amenitiesRepository.update(amenityId, amenity);
    return this.findOne(amenityId);
  }

  async remove(amenityId: string): Promise<void> {
    await this.amenitiesRepository.delete(amenityId);
  }
} 