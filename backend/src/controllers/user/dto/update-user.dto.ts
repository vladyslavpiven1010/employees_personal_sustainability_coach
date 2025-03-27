import { IsOptional, IsDate, IsString } from 'class-validator';
import { UpdateUserDto } from 'src/app/services/user/dto';

export class UpdateUserReqApiDto implements UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;
}