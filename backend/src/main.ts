import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  console.log('🚀 Server is starting...');
  app.enableCors()
  await app.listen(5010);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}
bootstrap();
