import { ERole } from "src/app/jwt-auth.guard";

export interface UpdateEmployeeRoleDto {
    newRole: ERole;
}