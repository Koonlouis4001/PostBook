import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true,logger: ['error', 'warn', 'log']});
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      //strategy: 'excludeAll',
      //excludeExtraneousValues: true
    }),
  );
  await app.listen(3000);
}
bootstrap();
