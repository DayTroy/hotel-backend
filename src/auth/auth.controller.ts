import { Controller, Post, Body, UnauthorizedException, Get, UseGuards, Request, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Employee } from 'src/employees/entities/employee.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateProfileDto } from '../employees/dto/update-profile.dto';
import { EmployeesService } from '../employees/employees.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly employeesService: EmployeesService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      const result = await this.authService.login(loginDto.email, loginDto.password);
      return {
        token: result.access_token,
        employee: result.employee
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.employeeId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile/update')
  updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.employeesService.updateProfile(req.user.employeeId, updateProfileDto);
  }
} 