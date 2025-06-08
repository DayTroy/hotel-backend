import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FindAvailableRoomsDto } from './dto/find-available-rooms.dto';

@Controller('api/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get('available')
  findAvailableByDates(
    @Query('checkInDate') checkInDate: string,
    @Query('checkOutDate') checkOutDate: string,
    @Query('guests') guests: number,
  ) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    return this.roomsService.findAvailableByDates({
      checkIn,
      checkOut,
      guests,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
