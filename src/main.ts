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
    .setTitle('API de Herramientas') // Título del documento Swagger
    .setDescription(
      'API que permite gestionar y consultar diferentes herramientas.',
    ) // Descripción general de la API
    .setVersion('1.0') // Versión de la API
    .addTag('herramientas', 'Endpoints relacionados con herramientas') // Etiqueta para los endpoints
    .addTag(
      'categorias',
      'Endpoints relacionados con las categorias de herramientas',
    ) // Etiqueta para los endpoints

    .addBearerAuth() // Añadir autenticación mediante JWT o tokens Bearer (opcional)
    .build();

  // Crear el documento Swagger
  const document = SwaggerModule.createDocument(app, config);

  // Configurar Swagger en la ruta /api
  SwaggerModule.setup('api', app, document);

  // Iniciar la aplicación en el puerto 3000
  await app.listen(3000);
}

bootstrap();
