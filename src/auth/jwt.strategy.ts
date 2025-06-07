import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // В продакшене использовать переменные окружения
    });
  }

  async validate(payload: any) {
    return { 
      employeeId: payload.sub,
      email: payload.email,
      jobPositionId: payload.jobPositionId
    };
  }
} 