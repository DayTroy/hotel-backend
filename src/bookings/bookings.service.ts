import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingGuest } from './entities/booking-guest.entity';
import { ProvidedAmenity } from '../provided-amenities/entities/provided-amenity.entity';
import { Guest } from '../guests/entities/guest.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(BookingGuest)
    private bookingGuestsRepository: Repository<BookingGuest>,
    @InjectRepository(ProvidedAmenity)
    private providedAmenitiesRepository: Repository<ProvidedAmenity>,
    @InjectRepository(Guest)
    private guestsRepository: Repository<Guest>,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find({ relations: ['room', 'bookingGuests', 'providedAmenities', 'bookingGuests.guest'] });
  }

  async findOne(bookingId: string): Promise<Booking | null> {
    return this.bookingsRepository.findOne({ where: { bookingId }, relations: ['room', 'bookingGuests', 'providedAmenities', 'bookingGuests.guest'] });
  }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const newBooking = this.bookingsRepository.create(createBookingDto);
    newBooking.bookingId = `BKG-${uuidv4().toUpperCase().split('-')[0]}`;
    newBooking.status = 'Новый';

    const savedBooking = await this.bookingsRepository.save(newBooking);

    // Создание гостей при оформлении брони
    if (createBookingDto.guests && createBookingDto.guests.length > 0) {
        const bookingGuestsToSave: BookingGuest[] = [];
        for (const guestDto of createBookingDto.guests) {
            // Поиск гостя
            let guestEntity = await this.guestsRepository.findOne({
                 where: { passportNumber: guestDto.passportNumber, passportSeries: guestDto.passportSeries }});

            if (!guestEntity) {
                // Создать гостя если новый
                guestEntity = this.guestsRepository.create(guestDto);
                if (!guestEntity.guestId) {
                     guestEntity.guestId = uuidv4();
                }
                 try {
                    guestEntity = await this.guestsRepository.save(guestEntity);
                 } catch (error) {
                    console.error('Error saving new guest:', error);
                    throw new BadRequestException('Failed to save one or more guest records.');
                 }
            }

            const bookingGuest = this.bookingGuestsRepository.create();
            bookingGuest.booking = savedBooking; // Связь с сохраненной бронью
            bookingGuest.guest = guestEntity; // Связь с созданным гостем
            bookingGuestsToSave.push(bookingGuest);
        }
        await this.bookingGuestsRepository.save(bookingGuestsToSave);
    }

    // Создание доп услуг в брони
    if (createBookingDto.providedAmenities && createBookingDto.providedAmenities.length > 0) {
        const providedAmenities = createBookingDto.providedAmenities.map(amenityDto => {
            const providedAmenity = this.providedAmenitiesRepository.create(amenityDto);
            providedAmenity.booking = savedBooking; // Связь с созданной бронью
            return providedAmenity;
        });
        savedBooking.providedAmenities = providedAmenities;
    }

    const finalBooking = await this.findOne(savedBooking.bookingId);
    if (!finalBooking) {
        throw new InternalServerErrorException('Failed to retrieve saved booking with relations');
    }
    return finalBooking;
  }

  async update(bookingId: string, updateBookingDto: Partial<CreateBookingDto>): Promise<Booking | null> {
    const booking = await this.findOne(bookingId);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${bookingId} not found`);
    }

    // Обновляем основные поля брони
    const { providedAmenities, guests, ...bookingData } = updateBookingDto;
    
    // Обновляем основные поля
    Object.assign(booking, bookingData);

    // Если есть обновления для дополнительных услуг
    if (providedAmenities) {
      // Удаляем старые услуги
      if (booking.providedAmenities && booking.providedAmenities.length > 0) {
        await this.providedAmenitiesRepository.remove(booking.providedAmenities);
      }

      // Создаем новые услуги
      const newProvidedAmenities = providedAmenities.map(amenityDto => {
        const providedAmenity = this.providedAmenitiesRepository.create(amenityDto);
        providedAmenity.booking = booking;
        return providedAmenity;
      });
      booking.providedAmenities = newProvidedAmenities;
    }

    // Если есть обновления для гостей
    if (guests) {
      // Удаляем старые связи с гостями
      if (booking.bookingGuests && booking.bookingGuests.length > 0) {
        await this.bookingGuestsRepository.remove(booking.bookingGuests);
      }

      // Создаем новые связи с гостями
      const bookingGuestsToSave: BookingGuest[] = [];
      for (const guestDto of guests) {
        // Поиск гостя
        let guestEntity = await this.guestsRepository.findOne({
          where: { passportNumber: guestDto.passportNumber, passportSeries: guestDto.passportSeries }
        });

        if (!guestEntity) {
          // Создать гостя если новый
          guestEntity = this.guestsRepository.create(guestDto);
          if (!guestEntity.guestId) {
            guestEntity.guestId = uuidv4();
          }
          try {
            guestEntity = await this.guestsRepository.save(guestEntity);
          } catch (error) {
            console.error('Error saving new guest:', error);
            throw new BadRequestException('Failed to save one or more guest records.');
          }
        }

        if (guestEntity) {
          const bookingGuest = this.bookingGuestsRepository.create();
          bookingGuest.booking = booking;
          bookingGuest.guest = guestEntity;
          bookingGuestsToSave.push(bookingGuest);
        }
      }
      booking.bookingGuests = bookingGuestsToSave;
    }

    // Сохраняем все изменения
    await this.bookingsRepository.save(booking);
    return this.findOne(bookingId);
  }

  async remove(bookingId: string): Promise<void> {
    const booking = await this.findOne(bookingId);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${bookingId} not found`);
    }

    // Удаляем связанные записи
    if (booking.bookingGuests && booking.bookingGuests.length > 0) {
      await this.bookingGuestsRepository.remove(booking.bookingGuests);
    }

    if (booking.providedAmenities && booking.providedAmenities.length > 0) {
      await this.providedAmenitiesRepository.remove(booking.providedAmenities);
    }

    await this.bookingsRepository.remove(booking);
  }
} 