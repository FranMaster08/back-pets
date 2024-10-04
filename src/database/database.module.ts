import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'pets',
      password: process.env.DB_PASSWORD || 'pets_password',
      database: process.env.DB_NAME || 'pets',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNC === 'false', // Usa 'true' o 'false' en las variables de entorno
    }),
  ],
})
export class DatabaseModule {}
