import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCleaningDto } from './dto/create-cleaning.dto';
import { UpdateCleaningDto } from './dto/update-cleaning.dto';
import { Cleaning } from './entities/cleaning.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CleaningsService {
  constructor(
    @InjectRepository(Cleaning)
    private cleaningsRepository: Repository<Cleaning>,
  ) {}

  async create(createCleaningDto: CreateCleaningDto): Promise<Cleaning> {
    const cleaning = this.cleaningsRepository.create({
      ...createCleaningDto,
      cleaningId: `CLT-${uuidv4().split('-')[0].toUpperCase()}`,
    });
    return this.cleaningsRepository.save(cleaning);
  }

  async findAll(): Promise<Cleaning[]> {
    return this.cleaningsRepository.find({
      relations: ['room', 'employee'],
    });
  }

  async findOne(id: string): Promise<Cleaning> {
    const cleaning = await this.cleaningsRepository.findOne({
      where: { cleaningId: id },
      relations: ['room', 'employee'],
    });
    
    if (!cleaning) {
      throw new NotFoundException(`Cleaning with ID ${id} not found`);
    }
    
    return cleaning;
  }

  async update(id: string, updateCleaningDto: UpdateCleaningDto): Promise<Cleaning> {
    const cleaning = await this.findOne(id);
    Object.assign(cleaning, updateCleaningDto);
    return this.cleaningsRepository.save(cleaning);
  }

  async remove(id: string): Promise<void> {
    const cleaning = await this.findOne(id);
    await this.cleaningsRepository.remove(cleaning);
  }
}
