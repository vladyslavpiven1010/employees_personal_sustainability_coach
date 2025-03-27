import { IsBoolean, IsDate, IsString } from 'class-validator';
import { CreateCompanyDto } from 'src/app/services/company/dto';

export class CreateCompanyReqApiDto implements CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}