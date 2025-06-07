import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestsModule } from './requests/requests.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestsModule } from './guests/guests.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomsCategoryModule } from './rooms-category/rooms-category.module';
import { BookingsModule } from './bookings/bookings.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { ProvidedAmenitiesModule } from './provided-amenities/provided-amenities.module';
import { DepartmentsModule } from './departments/departments.module';
import { JobPositionsModule } from './job-positions/job-positions.module';
import { EmployeesModule } from './employees/employees.module';
import { CleaningsModule } from './cleanings/cleanings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: '123123', 
      database: 'hotel', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
    }),
    RequestsModule,
    GuestsModule,
    RoomsModule,
    RoomsCategoryModule,
    BookingsModule,
    AmenitiesModule,
    ProvidedAmenitiesModule,
    DepartmentsModule,
    JobPositionsModule,
    EmployeesModule,
    CleaningsModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
