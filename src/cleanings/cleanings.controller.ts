import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CleaningsService } from './cleanings.service';
import { CreateCleaningDto } from './dto/create-cleaning.dto';
import { UpdateCleaningDto } from './dto/update-cleaning.dto';
import { Cleaning } from './entities/cleaning.entity';

@Controller('api/cleanings')
export class CleaningsController {
  constructor(private readonly cleaningsService: CleaningsService) {}

  @Post()
  create(@Body() createCleaningDto: CreateCleaningDto): Promise<Cleaning> {
    return this.cleaningsService.create(createCleaningDto);
  }

  @Get()
  findAll(): Promise<Cleaning[]> {
    return this.cleaningsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cleaning> {
    return this.cleaningsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCleaningDto: UpdateCleaningDto,
  ): Promise<Cleaning> {
    return this.cleaningsService.update(id, updateCleaningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cleaningsService.remove(id);
  }
}
