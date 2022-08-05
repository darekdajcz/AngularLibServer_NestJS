import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';

export function createDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setDescription('')
    .setTitle('')
    .setVersion('');

  for (const tag of SWAGGER_CONFIG.tags) {
    builder.addTag(tag);

  }
  const options = builder.build();
  /////////////////////////////////////////////////
  return SwaggerModule.createDocument(app, options);
}