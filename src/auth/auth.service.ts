import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from '../employees/employees.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private employeesService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const employee = await this.employeesService.findByEmail(email);
    if (employee && await bcrypt.compare(password, employee.password)) {
      const { password, ...result } = employee;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const employee = await this.validateUser(email, password);
    if (!employee) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: employee.employeeId,
      email: employee.email,
      jobPositionId: employee.jobPositionId,
      jobPositionTitle: employee.jobPositionTitle
    };

    return {
      access_token: this.jwtService.sign(payload),
      employee: employee
    };
  }

  async getProfile(employeeId: string) {
    const employee = await this.employeesService.findOne(employeeId);
    if (!employee) {
      throw new UnauthorizedException('Employee not found');
    }
    const { password, ...result } = employee;
    return result;
  }
} 