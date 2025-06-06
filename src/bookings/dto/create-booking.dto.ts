import { IsString, IsDate, IsNumber, IsOptional, Length, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Guest } from 'src/guests/entities/guest.entity';
import { ProvidedAmenity } from 'src/provided-amenities/entities/provided-amenity.entity';

export class CreateBookingDto {
  @IsDate()
  @Type(() => Date)
  readonly checkInDate: Date;

  @IsDate()
  @Type(() => Date)
  readonly checkOutDate: Date;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  readonly roomId: string;

  @IsNumber()
  readonly totalPrice: number;

  @ValidateNested({ each: true })
  @Type(() => Guest)
  readonly guests: Guest[];

  @ValidateNested({ each: true })
  @Type(() => ProvidedAmenity)
  @IsOptional()
  readonly providedAmenities?: ProvidedAmenity[];
}
