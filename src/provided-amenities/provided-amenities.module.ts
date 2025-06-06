import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidedAmenity } from './entities/provided-amenity.entity';
import { ProvidedAmenitiesService } from './provided-amenities.service';
import { ProvidedAmenitiesController } from './provided-amenities.controller';
import { AmenitiesModule } from '../amenities/amenities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProvidedAmenity]),
    AmenitiesModule
  ],
  controllers: [ProvidedAmenitiesController],
  providers: [ProvidedAmenitiesService],
  exports: [ProvidedAmenitiesService],
})
export class ProvidedAmenitiesModule {} 