import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ){}
  
  async create(createRoomDto: CreateRoomDto) {
    const room = this.roomRepository.create(createRoomDto);
    room.status = 'Свободный';
    return this.roomRepository.save(room);
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find({
      relations: ['roomCategory']
    });
  }

  async findOne(id: string): Promise<Room | null> {
    return this.roomRepository.findOne({ 
      where: { roomId: id },
      relations: ['roomCategory']
    });
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room | null> {
    await this.roomRepository.update(id, updateRoomDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<any> {
    return this.roomRepository.delete(id);
  }
}
