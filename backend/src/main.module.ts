import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from './app/app.module';
// import { 
//   CategoryController,
//   EventController,
//   TicketController,
//   UserController,
//   CompanyController,
//   AuthController,
//   NotificationController
// } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company, Role, User, Employee } from './app/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'sustainable_coach_database',
      entities: [User, Company, Role, Employee],
      synchronize: true,
      autoLoadEntities: true
    }),
    AppModule, 
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [
    // CategoryController, 
    // EventController, 
    // TicketController,
    // UserController,
    // CompanyController,
    // AuthController,
    // NotificationController
  ],
  providers: [],
  exports: []
})
export class MainModule {}