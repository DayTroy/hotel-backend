import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvidedAmenity } from './entities/provided-amenity.entity';
import { AmenitiesService } from '../amenities/amenities.service';

@Injectable()
export class ProvidedAmenitiesService {
  constructor(
    @InjectRepository(ProvidedAmenity)
    private providedAmenitiesRepository: Repository<ProvidedAmenity>,
    private amenitiesService: AmenitiesService,
  ) {}

  async findAll(): Promise<ProvidedAmenity[]> {
    return this.providedAmenitiesRepository.find({
      relations: ['amenity', 'booking'],
    });
  }

  async findOne(providedAmenityId: string): Promise<ProvidedAmenity | null>  {
    return this.providedAmenitiesRepository.findOne({
      where: { providedAmenityId },
      relations: ['amenity', 'booking'],
    });
  }

  async findByBooking(bookingId: string): Promise<ProvidedAmenity[]> {
    return this.providedAmenitiesRepository.find({
      where: { bookingId },
      relations: ['amenity'],
    });
  }

  async create(providedAmenity: Partial<ProvidedAmenity>): Promise<ProvidedAmenity> {
    const newProvidedAmenity = this.providedAmenitiesRepository.create(providedAmenity);
    return this.providedAmenitiesRepository.save(newProvidedAmenity);
  }

  async update(providedAmenityId: string, providedAmenity: Partial<ProvidedAmenity>): Promise<ProvidedAmenity | null> {
    await this.providedAmenitiesRepository.update(providedAmenityId, providedAmenity);
    return this.findOne(providedAmenityId);
  }

  async remove(providedAmenityId: string): Promise<void> {
    await this.providedAmenitiesRepository.delete(providedAmenityId);
  }
} 