import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CleaningsService } from './cleanings.service';
import { CreateCleaningDto } from './dto/create-cleaning.dto';
import { UpdateCleaningDto } from './dto/update-cleaning.dto';

@Controller('cleanings')
export class CleaningsController {
  constructor(private readonly cleaningsService: CleaningsService) {}

  @Post()
  create(@Body() createCleaningDto: CreateCleaningDto) {
    return this.cleaningsService.create(createCleaningDto);
  }

  @Get()
  findAll() {
    return this.cleaningsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cleaningsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCleaningDto: UpdateCleaningDto) {
    return this.cleaningsService.update(+id, updateCleaningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cleaningsService.remove(+id);
  }
}
