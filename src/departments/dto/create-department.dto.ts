import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  departmentId: string;

  @IsString()
  @IsNotEmpty()
  departmentTitle: string;

  @IsString()
  @IsNotEmpty()
  departmentCabinet: string;

  @IsString()
  @IsNotEmpty()
  workingHours: string;
}
