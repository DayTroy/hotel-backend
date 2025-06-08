import { Injectable, BadRequestException } from '@nestjs/common';
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
    const bookings = await this.bookingRepository.find({
      where: { roomId: id }
    });

    if (bookings.length > 0) {
      throw new BadRequestException(
        `Cannot delete room ${id} because it has ${bookings.length} associated bookings. ` +
        'Please either: 1) Cancel all bookings for this room first, or ' +
        '2) Mark the room as unavailable instead of deleting it.'
      );
    }

    return this.roomRepository.delete(id);
  }

  async findAvailableByDates(findAvailableRoomsDto: FindAvailableRoomsDto) {
    const { checkIn, checkOut } = findAvailableRoomsDto;
    
    if (checkIn.getTime() > checkOut.getTime()) {
      throw new BadRequestException('Дата заезда не может быть позже даты выезда');
    }

    // Находим все комнаты
    const allRooms = await this.roomRepository.find({
      relations: ['roomCategory'],
    });

    // Находим все бронирования, которые пересекаются с указанным периодом
    const overlappingBookings = await this.bookingRepository
      .createQueryBuilder('Booking')
      .where(
        '(Booking.checkInDate <= :checkOut AND Booking.checkOutDate >= :checkIn)',
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
