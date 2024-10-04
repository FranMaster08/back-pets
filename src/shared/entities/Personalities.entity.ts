import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dogs } from './Dogs.entity';

@Entity('Personalities', { schema: 'pets' })
export class Personalities {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'description', length: 255 })
  description: string;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('timestamp', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @OneToMany(() => Dogs, (dogs) => dogs.personality)
  dogs: Dogs[];
}
