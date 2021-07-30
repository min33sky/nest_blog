import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* Validation
  app.useGlobalPipes(new ValidationPipe());

  //* Swagger API document
  const config = new DocumentBuilder()
    .setTitle('Nest Blog')
    .setDescription('The blog API description')
    .setVersion('1.0.0')
    .addTag('blog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3095);
}
bootstrap();
