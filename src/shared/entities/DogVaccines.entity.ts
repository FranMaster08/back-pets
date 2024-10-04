import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Dogs } from './Dogs.entity';
import { Vaccines } from './Vaccines.entity';

@Index('vaccine_id', ['vaccineId'], {})
@Entity('DogVaccines', { schema: 'pets' })
export class DogVaccines {
  @Column('int', { primary: true, name: 'dog_id' })
  dogId: number;

  @Column('int', { primary: true, name: 'vaccine_id' })
  vaccineId: number;

  @Column('date', { name: 'vaccination_date', nullable: true })
  vaccinationDate: string | null;

  @ManyToOne(() => Dogs, (dogs) => dogs.dogVaccines, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'dog_id', referencedColumnName: 'id' }])
  dog: Dogs;

  @ManyToOne(() => Vaccines, (vaccines) => vaccines.dogVaccines, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'vaccine_id', referencedColumnName: 'id' }])
  vaccine: Vaccines;
}
