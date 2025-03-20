import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors()
  await app.listen(5001);
}
bootstrap();
