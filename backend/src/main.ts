import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exceptionFilters/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  //* Global Validation
  app.useGlobalPipes(new ValidationPipe());

  //* Global Interceptors
  app.useGlobalInterceptors(new SuccessInterceptor());

  //* Gloabl Filters
  app.useGlobalFilters(new HttpExceptionFilter());

  //* Swagger API document
  const config = new DocumentBuilder()
    .setTitle('Nest Blog')
    .setDescription('The blog API description')
    .setVersion('1.0.0')
    .addTag('blog')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);

  logger.log(`NEST Blog Server start at [${process.env.PORT}]`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
