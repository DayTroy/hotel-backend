import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateRoomCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  readonly roomCategoryId: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  readonly pricePerNight: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  readonly capacity: string;
}
