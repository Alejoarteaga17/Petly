import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class DomesticAnimal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  breed!: string;

  @Column()
  category!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  lifeExpectancy!: string;

  @Column()
  weight!: string;

  @Column()
  height!: string;

  @Column()
  behaviours!: string;

  @Column()
  commonDisease!: string;

  @Column()
  countryOrigin!: string;

  @Column({ type: 'text' })
  history!: string;

  @Column()
  image!: string;

  @OneToMany(() => Review, (review) => review.domesticAnimal)
  reviews!: Review[];
}