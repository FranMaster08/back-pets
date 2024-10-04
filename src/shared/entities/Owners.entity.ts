import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dogs } from './Dogs.entity';

@Index('email', ['email'], { unique: true })
@Index('email_2', ['email'], {})
@Entity('Owners', { schema: 'pets' })
export class Owners {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('varchar', { name: 'email', unique: true, length: 100 })
  email: string;

  @Column('varchar', { name: 'address', nullable: true, length: 255 })
  address: string | null;

  @Column('varchar', { name: 'phone', nullable: true, length: 20 })
  phone: string | null;

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

  @OneToMany(() => Dogs, (dogs) => dogs.owner)
  dogs: Dogs[];
}
