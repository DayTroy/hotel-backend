import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomsCategoryService } from './rooms-category.service';
import { CreateRoomCategoryDto } from './dto/create-room-category.dto';
import { UpdateRoomCategoryDto } from './dto/update-room-category.dto';

@Controller('api/roomCategories')
export class RoomsCategoryController {
  constructor(private readonly roomsCategoryService: RoomsCategoryService) {}

  @Post()
  create(@Body() createRoomsCategoryDto: CreateRoomCategoryDto) {
    return this.roomsCategoryService.create(createRoomsCategoryDto);
  }

  @Get()
  findAll() {
    return this.roomsCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsCategoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomsCategoryDto: UpdateRoomCategoryDto) {
    return this.roomsCategoryService.update(id, updateRoomsCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsCategoryService.remove(id);
  }
}
