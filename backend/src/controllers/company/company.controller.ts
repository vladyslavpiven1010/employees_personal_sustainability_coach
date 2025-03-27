import { Body, Controller, Post, Get, Patch, Param, Delete, UseGuards, Req, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CompanyService,  EmployeeService,  TokenService,  UserService } from 'src/app/services';
import { CreateCompanyReqApiDto } from './dto/create-companydto';
import { UpdateCompanyReqApiDto } from './dto/update-company.dto';
import { JwtAuthGuard, ERole } from 'src/app/jwt-auth.guard';
import { RequiredRoles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthService } from 'src/app/services';
import { Employee, User } from 'src/app/entities';

@Controller('company')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompanyController {
  constructor(
    private authService: AuthService,
    private companyService: CompanyService, 
    private userService: UserService,
    private employeeService: EmployeeService,
    private tokenService: TokenService)
    {}

  @Get()
  async getCompanies(): Promise<any> {
      const company = await this.companyService.findAll();
      return company;
  }

  @RequiredRoles(ERole.COMPANY_MODERATOR, ERole.COMPANY)
  @Get('members')
  async getAllCompanyMembers(@Req() request: any): Promise<any> {
      const members = await this.userService.findCompanyMembers(request.user.companyId);
      return members;
  }

  @Get(':id')
  async getCompany(@Req() request: any, @Param() params): Promise<any> {
    const company = await this.companyService.findOne(params.id);
    return company;
  }

  @Post()
  async createCompany(@Req() request: any, @Body() companyDto: CreateCompanyReqApiDto): Promise<any> {
    const company = await this.companyService.create(companyDto);
    await this.employeeService.createEmployee(request.user.sub, company.id, ERole.COMPANY);

    const user = await this.userService.findOneById(request.user.sub);

    if (!user) throw new BadRequestException("User with this id does not exist");
    const newAccessToken = await this.authService.generateAccessToken(user.id, company.id, ERole.COMPANY);

    return {
      company,
      accessToken: newAccessToken,
    };
  }

  @RequiredRoles(ERole.COMPANY_MODERATOR, ERole.COMPANY)
  @Post('invite/:id')
  async inviteUser(@Req() request: any, @Param() params): Promise<Employee> {
    const user = await this.userService.findOneById(request.user.sub);
    const invited = await this.userService.findOneById(params["id"]);

    if (!user) throw new BadRequestException(`User with this id does not exist`);
    if (!invited) throw new BadRequestException("You invite non-existent user");
    
    return await this.employeeService.createEmployee(invited.id, request.user.companyId, ERole.USER);
  }

  @RequiredRoles(ERole.COMPANY_MODERATOR, ERole.COMPANY)
  @Post('kick_out/:id')
  async kickOutUser(@Req() request: any, @Param() params: any): Promise<void> {
    const kicked_user = await this.userService.findOneById(params["id"]);

    if (!kicked_user) throw new BadRequestException("User with this credentials does not exist");

    const isCompanyMember = await this.employeeService.isUserCompanyEmployee(kicked_user.id, request.user.companyId);
    const memberCount = await this.userService.countCompanyMembers(request.user.companyId);

    if (request.user.role !== ERole.COMPANY || !isCompanyMember)
      throw new ForbiddenException('You do not have permission to kick out user from this company');
    if (memberCount <= 1) {
      throw new BadRequestException('Cannot kick out the last remaining member of the company');
    }

    await this.employeeService.removeEmployee(params["id"]);
  }

  @RequiredRoles(ERole.COMPANY)
  @Patch(':id')
  async updateCompany(@Req() request: any, @Param() params: number, @Body() companyDto: UpdateCompanyReqApiDto): Promise<any> {
    const company = await this.companyService.findOne(params["id"]);

    if (!company) throw new BadRequestException("Company with this credentials does not exist");
    if (request.user.companyId !== company.id) 
      throw new ForbiddenException('You do not have permission to update this company');
    
    const updatedCompany = await this.companyService.update(params["id"], companyDto);
    return updatedCompany;
  }

  @RequiredRoles(ERole.COMPANY)
  @Delete(':id')
  async deleteCompany(@Req() request: any, @Param() params: number): Promise<any> {
    const user = await this.userService.findOneById(request.user.sub);
    const company = await this.companyService.findOne(params["id"]);

    if (!user) throw new BadRequestException(`User with this id does not exist`);

    const isCompanyMember = await this.employeeService.isUserCompanyEmployee(user.id, request.user.companyId);
    
    if (!company) throw new BadRequestException("Company with this credentials does not exist");
    if (request.user.role !== ERole.COMPANY || !isCompanyMember) 
      throw new ForbiddenException('You do not have permission to update this company');

    const members: Employee[] = await this.employeeService.getCompanyEmployees(request.user.companyId);

    members.map(member => {
      return this.employeeService.removeEmployee(member.id);
    });

    await this.companyService.deleteCompany(params["id"]);
    const newAccessToken = await this.authService.generateAccessToken(user.id, company.id, ERole.USER);

    return {
      accessToken: newAccessToken,
    };
  }
}
