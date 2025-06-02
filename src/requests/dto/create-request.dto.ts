import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateRequestDto {
@IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}
