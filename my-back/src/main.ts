import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.DATABASE_HOST)
  console.log(process.env.DATABASE_USERNAME)
  console.log(process.env.DATABASE_PASSWORD)
  console.log(process.env.DATABASE_NAME)
  console.log(process.env.DATABASE_SYNCHRONIZABLE)
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
