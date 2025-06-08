import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';   
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [
    EmployeesModule,
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key', // На проде использовать переменные окружения
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {} 