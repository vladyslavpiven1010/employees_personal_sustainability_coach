import { Module } from '@nestjs/common';
import { AuthService,  UserService, EmployeeService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company, User, Role, Employee } from './entities';

@Module({
  providers: [
    // Register all business logic services
    // CompanyService, 
    UserService, 
    AuthService,
    EmployeeService
  ],
  exports: [
    // Export all business logic services
    // CompanyService, 
    UserService, 
    AuthService,
    EmployeeService,
    JwtModule
  ],
  imports: [
    TypeOrmModule.forFeature([Event, User, Company, Employee]),
    JwtModule.register({
      secret: 'sdfsdf',
      signOptions: { expiresIn: '15m' },
    })
  ]
})
export class AppModule {}
