import { IsString, IsOptional, MinLength, IsEmail, Matches } from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    middleName?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    currentPassword?: string;

    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'New password must be at least 6 characters long' })
    newPassword?: string;

    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'Confirm password must be at least 6 characters long' })
    confirmPassword?: string;
} 