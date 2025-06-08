import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPositionsController } from './job-positions.controller';
import { JobPositionsService } from './job-positions.service';
import { JobPosition } from './entities/job-position.entity';
import { Employee } from '../employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobPosition, Employee])
  ],
  controllers: [JobPositionsController],
  providers: [JobPositionsService],
  exports: [JobPositionsService],
})
export class JobPositionsModule {}
