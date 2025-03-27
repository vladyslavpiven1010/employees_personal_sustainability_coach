import { Controller, Post, Body, UnauthorizedException, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { AuthService, CompanyService, EmployeeService, TokenService } from 'src/app/services';
import { LoginUserDto, RegisterUserDto } from './dto';
import { ERole, JwtAuthGuard } from 'src/app/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService, 
    private employeeService: EmployeeService
  ) {}

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const employee = await this.employeeService.getUserEmployees(user.id);

    if (employee.length < 1) throw new BadRequestException("User must create or join to company");
    
    return this.authService.login(user, employee[0].company.id, employee[0].role.name);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      const user = await this.authService.register(registerUserDto);

      await this.employeeService.createEmployee(user.id, registerUserDto.companyId, ERole.USER);
    } catch (error) {
      console.error('Error during registration:', error.message, error.stack);
      throw error;
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Req() request: any, @Body('accessToken') accessToken: string) {
    try {
      const newAccessToken = await this.authService.refreshToken(accessToken, request.user.company, request.user.role);

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string) {
    return this.authService.logout(refreshToken);
  }
}
