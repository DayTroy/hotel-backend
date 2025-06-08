import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPosition } from './entities/job-position.entity';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { UpdateJobPositionDto } from './dto/update-job-position.dto';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class JobPositionsService {
  constructor(
    @InjectRepository(JobPosition)
    private jobPositionsRepository: Repository<JobPosition>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
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
    
    // Проверяем, есть ли сотрудники с этой должностью
    const employeesWithPosition = await this.employeeRepository.find({
      where: { jobPosition: { jobPositionId: id } }
    });

    if (employeesWithPosition.length > 0) {
      throw new BadRequestException(
        `Cannot delete job position because it is assigned to ${employeesWithPosition.length} employee(s). ` +
        'Please reassign these employees to different positions first.'
      );
    }

    return this.jobPositionsRepository.remove(jobPosition);
  }
}
