import { IsString, IsDate, MinLength } from 'class-validator';

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

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
