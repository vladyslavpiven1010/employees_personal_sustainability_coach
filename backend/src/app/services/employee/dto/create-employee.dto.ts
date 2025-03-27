import { ERole } from "src/app/jwt-auth.guard";

export interface CreateEmployeeDto {
    companyId: number;
    role: ERole;
}