import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { Amenity } from './entities/amenity.entity';

@Controller('api/amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Get()
  findAll() {
    return this.amenitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.amenitiesService.findOne(id);
  }

  @Post()
  create(@Body() createAmenityDto: Partial<Amenity>) {
    return this.amenitiesService.create(createAmenityDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAmenityDto: Partial<Amenity>) {
    return this.amenitiesService.update(id, updateAmenityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.amenitiesService.remove(id);
  }
} 