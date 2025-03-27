import { Module } from '@nestjs/common';
import { AuthService,  UserService, EmployeeService, CompanyService, TokenService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company, User, Token, Role, Employee } from './entities';

@Module({
  providers: [
    // Register all business logic services
    TokenService,
    CompanyService, 
    UserService, 
    AuthService,
    EmployeeService
  ],
  exports: [
    // Export all business logic services
    TokenService,
    CompanyService, 
    UserService, 
    AuthService,
    EmployeeService,
    JwtModule,
  ],
  imports: [
    TypeOrmModule.forFeature([User, Company, Employee, Role, Token]),
    JwtModule.register({
      secret: 'sdfsdf',
      signOptions: { expiresIn: '15m' },
    })
  ]
})
export class AppModule {}
