import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DogVaccines } from './DogVaccines.entity';
import { Owners } from './Owners.entity';
import { Personalities } from './Personalities.entity';
import { Breeds } from './Breeds.entity';

@Index('owner_id', ['ownerId'], {})
@Index('personality_id', ['personalityId'], {})
@Index('breed_id', ['breedId'], {})
@Index('name', ['name'], {})
@Index('color', ['color'], {})
@Entity('Dogs', { schema: 'pets' })
export class Dogs {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('int', { name: 'age', nullable: true })
  age: number | null;

  @Column('decimal', { name: 'weight', nullable: true, precision: 5, scale: 2 })
  weight: string | null;

  @Column('decimal', { name: 'height', nullable: true, precision: 5, scale: 2 })
  height: string | null;

  @Column('varchar', { name: 'color', nullable: true, length: 50 })
  color: string | null;

  @Column('varchar', { name: 'photo_url', nullable: true, length: 255 })
  photoUrl: string | null;

  @Column('int', { name: 'owner_id', nullable: true })
  ownerId: number | null;

  @Column('int', { name: 'personality_id', nullable: true })
  personalityId: number | null;

  @Column('int', { name: 'breed_id', nullable: true })
  breedId: number | null;

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

  @OneToMany(() => DogVaccines, (dogVaccines) => dogVaccines.dog)
  dogVaccines: DogVaccines[];

  @ManyToOne(() => Owners, (owners) => owners.dogs, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'owner_id', referencedColumnName: 'id' }])
  owner: Owners;

  @ManyToOne(() => Personalities, (personalities) => personalities.dogs, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'personality_id', referencedColumnName: 'id' }])
  personality: Personalities;

  @ManyToOne(() => Breeds, (breeds) => breeds.dogs, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'breed_id', referencedColumnName: 'id' }])
  breed: Breeds;
}
