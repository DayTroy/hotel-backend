import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  async findByEmail(email: string): Promise<Employee | null> {
    return this.employeesRepository.findOne({
      where: { email },
      relations: ['jobPosition'],
    });
  }

  async findAll(): Promise<Employee[]> {
    return this.employeesRepository.find({
      relations: ['jobPosition'],
    });
  }

  async findOne(employeeId: string): Promise<Employee | null> {
    if (!employeeId) {
      throw new BadRequestException('Employee ID is required');
    }
    return this.employeesRepository.findOne({ 
      where: { employeeId },
      relations: ['jobPosition'],
    });
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const existingEmployee = await this.findByEmail(createEmployeeDto.email);
    if (existingEmployee) {
      throw new BadRequestException('Employee with this email already exists');
    }
    
    const hashedPassword = await bcrypt.hash(createEmployeeDto.password, 10);

    const employee = this.employeesRepository.create({
      ...createEmployeeDto,
      password: hashedPassword,
      birthdate: new Date(createEmployeeDto.birthdate),
      dateOfEmployment: new Date(createEmployeeDto.dateOfEmployment)
    });
    return this.employeesRepository.save(employee);
  }

  async update(employeeId: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    if (!employeeId) {
      throw new BadRequestException('Employee ID is required');
    }

    const employee = await this.findOne(employeeId);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }
    
    const updatedEmployee = {
      ...employee,
      ...updateEmployeeDto,
      birthdate: updateEmployeeDto.birthdate ? new Date(updateEmployeeDto.birthdate) : employee.birthdate,
      dateOfEmployment: updateEmployeeDto.dateOfEmployment ? new Date(updateEmployeeDto.dateOfEmployment) : employee.dateOfEmployment
    };
    
    return this.employeesRepository.save(updatedEmployee);
  }

  async remove(employeeId: string): Promise<void> {
    if (!employeeId) {
      throw new BadRequestException('Employee ID is required');
    }
    await this.employeesRepository.delete(employeeId);
  }
} 