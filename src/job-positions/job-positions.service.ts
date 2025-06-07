import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPosition } from './entities/job-position.entity';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { UpdateJobPositionDto } from './dto/update-job-position.dto';

@Injectable()
export class JobPositionsService {
  constructor(
    @InjectRepository(JobPosition)
    private jobPositionsRepository: Repository<JobPosition>,
  ) {}

  create(createJobPositionDto: CreateJobPositionDto) {
    const jobPosition = this.jobPositionsRepository.create(createJobPositionDto);
    return this.jobPositionsRepository.save(jobPosition);
  }

  findAll() {
    return this.jobPositionsRepository.find({
      relations: ['department'],
    });
  }

  async findOne(id: string) {
    const jobPosition = await this.jobPositionsRepository.findOne({
      where: { jobPositionId: id },
      relations: ['department'],
    });
    if (!jobPosition) {
      throw new NotFoundException(`Job position with ID ${id} not found`);
    }
    return jobPosition;
  }

  async update(id: string, updateJobPositionDto: UpdateJobPositionDto) {
    const jobPosition = await this.findOne(id);
    Object.assign(jobPosition, updateJobPositionDto);
    return this.jobPositionsRepository.save(jobPosition);
  }

  async remove(id: string) {
    const jobPosition = await this.findOne(id);
    return this.jobPositionsRepository.remove(jobPosition);
  }
}
