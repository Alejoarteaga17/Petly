// Author: Alejandra Suarez
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Review } from './review.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class DomesticAnimal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  breed!: string;

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

  @ManyToOne(() => Category, (category) => category.domesticAnimals, {
    onDelete: 'CASCADE',
  })
  
  @JoinColumn({ name: 'categoryId' })
  category!: Category;

  @RelationId((domesticAnimal: DomesticAnimal) => domesticAnimal.category)
  categoryId!: number | null;

  @OneToMany(() => Review, (review) => review.domesticAnimal)
  reviews!: Review[];
}
