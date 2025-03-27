import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { 
  UserController,
  CompanyController,
  AuthController,
  EmployeeController
} from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company, Role, User, Employee, Token } from './app/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5434,
      username: 'postgres',
      password: '1111',
      database: 'sustainable_coach',
      entities: [User, Company, Role, Employee, Token],
      synchronize: true,
      autoLoadEntities: true
    }),
    AppModule, 
  ],
  controllers: [
    EmployeeController,
    UserController,
    CompanyController,
    AuthController
  ],
  providers: [],
  exports: []
})
export class MainModule {}