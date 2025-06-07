import { IsString, IsNotEmpty, IsDate, IsUUID } from 'class-validator';

export class CreateCleaningDto {
  @IsDate()
  @IsNotEmpty()
  scheduledDate: Date;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  cleaningType: string;

  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsUUID()
  @IsNotEmpty()
  employeeId: string;
}
