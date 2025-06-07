import { IsString, IsNotEmpty } from 'class-validator';

export class CreateJobPositionDto {
  @IsString()
  @IsNotEmpty()
  jobPositionId: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  jobSalary: string;

  @IsString()
  @IsNotEmpty()
  departmentId: string;
}
