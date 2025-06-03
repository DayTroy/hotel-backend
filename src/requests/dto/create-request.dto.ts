import { IsString, IsEmail, IsDate, IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly requestId: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsDate()
  readonly dateIn: Date;

  @IsDate()
  readonly dateOut: Date;

  @IsString()
  readonly description: string;

  @IsString()
  // @IsNotEmpty()
  readonly guestId: string;
}
