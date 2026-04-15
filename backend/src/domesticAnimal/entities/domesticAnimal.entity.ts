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

  @Column({ nullable: true })
  lifeExpectancy?: string;

  @Column({ nullable: true })
  weight?: string;

  @Column({ nullable: true })
  height?: string;

  @Column({ nullable: true })
  behaviours?: string;

  @Column({ nullable: true })
  commonDisease?: string;

  @Column({ nullable: true })
  countryOrigin?: string;

  @Column({ type: 'text', nullable: true })
  history?: string;

  @Column({ nullable: true })
  image?: string;

  @OneToMany(() => Review, (review) => review.domesticAnimal)
  reviews!: Review[];
}