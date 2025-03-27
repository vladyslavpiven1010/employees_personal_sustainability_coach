import { IsString } from 'class-validator';
import { ERole } from 'src/app/jwt-auth.guard';
import { UpdateEmployeeRoleDto } from 'src/app/services/employee/dto/update-employee-role.dto';

export class UpdateEmployeeRoleDtoReqApiDto implements UpdateEmployeeRoleDto {
  @IsString()
  newRole: ERole;
}