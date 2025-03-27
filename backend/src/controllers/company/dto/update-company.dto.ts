import { IsOptional, IsDate, IsString, IsBoolean } from 'class-validator';
import { UpdateCompanyDto } from 'src/app/services/company/dto';

export class UpdateCompanyReqApiDto implements UpdateCompanyDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}