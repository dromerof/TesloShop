import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Bootstrap");

  app.setGlobalPrefix("api")

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  
  const config = new DocumentBuilder()
    .setTitle('ModeMix')
    .setDescription('API de ModeMix para la gestión de productos, usuarios, autenticación y más')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  document.tags = [
    { name: 'Seed', description: 'Endpoint to seed data' },
    { name: 'Products', description: 'Endpoints related to products' },
    { name: 'Auth', description: 'Endpoints related to authentication' },
    { name: 'Files - Get and Upload', description: 'Endpoints related to files' },
  
  ];

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  logger.log(`App running on port ${process.env.PORT}`);
  
}
bootstrap();
