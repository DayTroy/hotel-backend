import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!id || id === 'undefined') {
      throw new BadRequestException('Employee ID is required');
    }
    return this.employeesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    if (!id || id === 'undefined') {
      throw new BadRequestException('Employee ID is required');
    }
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!id || id === 'undefined') {
      throw new BadRequestException('Employee ID is required');
    }
    return this.employeesService.remove(id);
  }
}
