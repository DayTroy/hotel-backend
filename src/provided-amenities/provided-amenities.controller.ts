import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvidedAmenitiesService } from './provided-amenities.service';
import { ProvidedAmenity } from './entities/provided-amenity.entity';

@Controller('api/provided-amenities')
export class ProvidedAmenitiesController {
  constructor(private readonly providedAmenitiesService: ProvidedAmenitiesService) {}

  @Get()
  findAll() {
    return this.providedAmenitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providedAmenitiesService.findOne(id);
  }

  @Get('booking/:bookingId')
  findByBooking(@Param('bookingId') bookingId: string) {
    return this.providedAmenitiesService.findByBooking(bookingId);
  }

  @Post()
  create(@Body() createProvidedAmenityDto: Partial<ProvidedAmenity>) {
    return this.providedAmenitiesService.create(createProvidedAmenityDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProvidedAmenityDto: Partial<ProvidedAmenity>) {
    return this.providedAmenitiesService.update(id, updateProvidedAmenityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providedAmenitiesService.remove(id);
  }
} 