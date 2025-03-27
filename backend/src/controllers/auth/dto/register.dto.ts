import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsNumber()
  companyId: number;
}