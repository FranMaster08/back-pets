import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Herramientas } from './Herramientas.entity';

@Entity('categorias', { schema: 'herramientas' })
export class Categorias {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nombre', length: 255 })
  nombre: string;

  @OneToMany(() => Herramientas, (herramientas) => herramientas.idcategoria)
  herramientas: Herramientas[];
}
