import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DogVaccines } from './DogVaccines.entity';

@Entity('Vaccines', { schema: 'pets' })
export class Vaccines {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

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

  @OneToMany(() => DogVaccines, (dogVaccines) => dogVaccines.vaccine)
  dogVaccines: DogVaccines[];
}
