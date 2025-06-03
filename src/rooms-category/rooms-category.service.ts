import { Injectable } from '@nestjs/common';
import { CreateRoomCategoryDto } from './dto/create-room-category.dto';
import { UpdateRoomCategoryDto } from './dto/update-room-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomCategory } from './entities/room-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsCategoryService {
  constructor(
    @InjectRepository(RoomCategory)
    private roomCategoryRepository: Repository<RoomCategory>,
  ){}
  
  async create(createRoomsCategoryDto: CreateRoomCategoryDto) {
    return this.roomCategoryRepository.create(createRoomsCategoryDto);
  }

  async findAll(): Promise<RoomCategory[]> {
    return this.roomCategoryRepository.find();
  }

  async findOne(id: string): Promise<RoomCategory | null> {
    return this.roomCategoryRepository.findOne({ where: { roomCategoryId: id } });
  }

  async update(id: string, updateRoomsCategoryDto: UpdateRoomCategoryDto): Promise<any> {
    return this.roomCategoryRepository.update(id, updateRoomsCategoryDto);
  }

  async remove(id: string): Promise<any> {
    return this.roomCategoryRepository.delete(id);
  }
}
