import { IsString, IsDate } from 'class-validator';

export class CreateEmployeeDto {
    @IsString()
    lastName: string;

    @IsString()
    firstName: string;

    @IsString()
    middleName: string;

    @IsDate()
    birthdate: Date;

    @IsDate()
    dateOfEmployment: Date;

    @IsString()
    phoneNumber: string;

    @IsString()
    email: string;

    @IsString()
    passportNumber: string;

    @IsString()
    passportSeries: string;

    @IsString()
    jobPositionId: string;
}
