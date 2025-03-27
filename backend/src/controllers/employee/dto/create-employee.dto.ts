import { IsNumber, IsString } from 'class-validator';
import { ERole } from 'src/app/jwt-auth.guard';
import { CreateEmployeeDto } from 'src/app/services/employee/dto';

export class CreateEmployeeDtoReqApiDto implements CreateEmployeeDto {
  @IsNumber()
  companyId: number;

  @IsString()
  role: ERole;
}