import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categorias } from './Categorias.entity';

@Index('idx_herramientas_id_categoria', ['idCategoria'], {})
@Entity('herramientas', { schema: 'herramientas' })
export class Herramientas {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nombre', length: 255 })
  nombre: string;

  @Column('double', { name: 'peso', precision: 22 })
  peso: number;

  @Column('int', { name: 'id_categoria' })
  idcategoria: number;

  @ManyToOne(() => Categorias, (categorias) => categorias.herramientas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id_categoria', referencedColumnName: 'id' }])
  idCategoria: Categorias;
}
