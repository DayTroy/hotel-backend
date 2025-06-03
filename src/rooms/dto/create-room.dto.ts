import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  readonly roomId: string;

  @IsString()
  @IsNotEmpty()
  readonly stage: string;

  @IsString()
  readonly status: string;

  @IsString()
  @IsNotEmpty()
  readonly roomCategoryId: string;
}
