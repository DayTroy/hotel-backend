import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  private generatePassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

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

  async create(createEmployeeDto: CreateEmployeeDto): Promise<{ employee: Employee; password: string }> {
    const existingEmployee = await this.findByEmail(createEmployeeDto.email);
    if (existingEmployee) {
      throw new BadRequestException('Employee with this email already exists');
    }
    
    try {
      const generatedPassword = this.generatePassword();

      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const employee = this.employeesRepository.create({
        ...createEmployeeDto,
        password: hashedPassword,
        birthdate: new Date(createEmployeeDto.birthdate),
        dateOfEmployment: new Date(createEmployeeDto.dateOfEmployment)
      });

      const savedEmployee = await this.employeesRepository.save(employee);
      
      return {
        employee: savedEmployee,
        password: generatedPassword
      };
    } catch (error) {
      console.error('Error creating employee:', error);
      throw new BadRequestException('Failed to create employee: ' + error.message);
    }
  }

  async updateProfile(employeeId: string, updateProfileDto: UpdateProfileDto): Promise<Employee> {
    const employee = await this.findOne(employeeId);
    if (!employee) {
      throw new NotFoundException(`Сотрудник с таким кодом ${employeeId} не найден`);
    }

    if (updateProfileDto.email && updateProfileDto.email !== employee.email) {
      const existingEmployee = await this.findByEmail(updateProfileDto.email);
      if (existingEmployee) {
        throw new BadRequestException('Почта уже занята');
      }
    }

    if (updateProfileDto.newPassword) {
      if (!updateProfileDto.currentPassword) {
        throw new BadRequestException('Текущий пароль нужно изменить');
      }

      const isPasswordValid = await bcrypt.compare(updateProfileDto.currentPassword, employee.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Текущий пароль введен неверно!');
      }

      if (updateProfileDto.newPassword !== updateProfileDto.confirmPassword) {
        throw new BadRequestException('Текущий и новый пароли не совпадают');
      }

      const hashedPassword = await bcrypt.hash(updateProfileDto.newPassword, 10);
      employee.password = hashedPassword;
    }

    if (updateProfileDto.firstName) employee.firstName = updateProfileDto.firstName;
    if (updateProfileDto.lastName) employee.lastName = updateProfileDto.lastName;
    if (updateProfileDto.middleName) employee.middleName = updateProfileDto.middleName;
    if (updateProfileDto.phoneNumber) employee.phoneNumber = updateProfileDto.phoneNumber;
    if (updateProfileDto.email) employee.email = updateProfileDto.email;

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