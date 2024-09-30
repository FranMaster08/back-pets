import { Module } from '@nestjs/common';
import { HerramientasModule } from './herramientas/herramientas.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [HerramientasModule, CategoriasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'user_password',
  database: 'mydatabase',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true, // ¡No uses esto en producción!
});
