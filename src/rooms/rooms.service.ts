import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { RoomCategory } from '../rooms-category/entities/room-category.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { FindAvailableRoomsDto } from './dto/find-available-rooms.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(RoomCategory)
    private roomCategoryRepository: Repository<RoomCategory>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
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

  async findAvailable(): Promise<Room[]> {
    return this.roomRepository.find({
      where: { status: 'Свободный' },
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

  async findAvailableByDates(findAvailableRoomsDto: FindAvailableRoomsDto) {
    const { checkIn, checkOut } = findAvailableRoomsDto;

    // Находим все комнаты
    const allRooms = await this.roomRepository.find({
      relations: ['roomCategory'],
    });

    // Находим все бронирования, которые пересекаются с указанным периодом
    const overlappingBookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .where(
        '(booking.checkIn <= :checkOut AND booking.checkOut >= :checkIn)',
        { checkIn, checkOut },
      )
      .getMany();

    // Получаем ID комнат, которые забронированы на указанный период
    const bookedRoomIds = overlappingBookings.map((booking) => booking.roomId);

    // Фильтруем комнаты, исключая забронированные
    const availableRooms = allRooms.filter(
      (room) => !bookedRoomIds.includes(room.roomId),
    );

    return availableRooms;
  }
}
