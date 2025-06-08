import { IsDate, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAvailableRoomsDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkIn: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  checkOut: Date;

  @IsNumber()
  @Min(1)
  guests: number;
} 