import { BadRequestException, Body, Controller, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { EmployeeService, } from 'src/app/services';
import { CreateEmployeeDtoReqApiDto } from './dto/create-employee.dto';
import { ERole, JwtAuthGuard } from 'src/app/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateEmployeeRoleDtoReqApiDto } from './dto';
import { RequiredRoles } from '../auth/roles.decorator';

@Controller('employee')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployeeController {
    constructor(private employeeService: EmployeeService) {}

    @Post('/accept-invitation')
    async acceptInvitation(
        @Req() request: any,
        @Body() employeeDto: CreateEmployeeDtoReqApiDto
    ): Promise<any> {
        await this.employeeService.createEmployee(
            request.user.sub,
            employeeDto.companyId,
            employeeDto.role
        );

        return 'Success';
    }

    // /**
    //  * Reject the invitation to join a company
    //  */
    // @Patch('/reject-invitation')
    // async rejectInvitation(@Req() request: any): Promise<any> {
    //     await this.employeeService.updateUserRole(request.user.sub);

    //     return 'Success';
    // }

    @RequiredRoles(ERole.USER, ERole.COMPANY_MODERATOR)
    @Post('/leave_company')
    async leaveCompany(@Req() request: any): Promise<any> {
        const employee = await this.employeeService.getCompanyEmployee(request.user.companyId, request.user.sub);
        if (!employee) throw new BadRequestException("This user is not a member of this company");

        await this.employeeService.removeEmployee(employee.id);
        return 'Success';
    }

    @RequiredRoles(ERole.COMPANY)
    @Patch(':employee_id/update_role')
    async updateEmployeeRole(
        @Req() request: any,
        @Param() params: number,
        @Body() updateRoleDto: UpdateEmployeeRoleDtoReqApiDto
    ): Promise<any> {
        const isCurrentUserCompanyMember = await this.employeeService.isUserCompanyEmployee(request.user.sub, request.user.companyId);
        if (!isCurrentUserCompanyMember) throw new BadRequestException("You are not member of this company");

        const isUpdatedUserCompanyMember = await this.employeeService.isCompanyEmployeeExist(params['employee_id'], request.user.companyId);
        if (!isUpdatedUserCompanyMember) throw new BadRequestException("Updated user is not member of this company");

        await this.employeeService.updateEmployeeRole(params['employee_id'], updateRoleDto.newRole);

        return 'Success';
    }
}
