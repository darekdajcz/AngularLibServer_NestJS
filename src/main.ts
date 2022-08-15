import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule
  );
  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true,
  //   whitelist: true
  // }));

  const options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials":true
  }
  //app.use(cors(options))
  app.enableCors(options)
  // example to usages global interceptors'
  // app.useGlobalInterceptors(new LoggingInterceptor());
  // app.setGlobalPrefix('app/')
  SwaggerModule.setup('api', app, createDocument(app))
  await app.listen(3000);
}

bootstrap();
