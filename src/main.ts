import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar el pipe global de validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve automáticamente propiedades que no están definidas en el DTO
      transform: true, // Transforma las entradas (ejemplo: convierte strings a números)
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Mascotas') // Título del documento Swagger
    .setDescription(
      'API que permite gestionar y consultar información sobre mascotas.',
    ) // Descripción general de la API
    .setVersion('1.0') // Versión de la API
    .addTag('mascotas', 'Endpoints relacionados con mascotas') // Etiqueta para los endpoints relacionados con mascotas
    .addTag('dueños', 'Endpoints relacionados con los dueños de las mascotas') // Etiqueta para los endpoints relacionados con dueños
    .addTag('vacunas', 'Endpoints relacionados con las vacunas de las mascotas') // Etiqueta para los endpoints relacionados con vacunas

    .addBearerAuth() // Añadir autenticación mediante JWT o tokens Bearer (opcional)
    .build();

  // Crear el documento Swagger
  const document = SwaggerModule.createDocument(app, config);

  // Configurar Swagger en la ruta /api
  SwaggerModule.setup('api', app, document);

  // Iniciar la aplicación en el puerto 3000
  app.enableCors({ origin: '*' });
  await app.listen(3000);
}

bootstrap();
