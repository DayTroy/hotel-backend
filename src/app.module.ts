import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestsModule } from './requests/requests.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestsModule } from './guests/guests.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomsCategoryModule } from './rooms-category/rooms-category.module';
import { BookingsModule } from './bookings/bookings.module';

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
    BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
