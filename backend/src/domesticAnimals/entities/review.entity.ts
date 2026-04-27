// Author: Alejandro Arteaga & Alejandra Suarez
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
  CreateDateColumn,
} from 'typeorm';
import { DomesticAnimal } from './domesticAnimal.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  rating!: number;

  @Column({ type: 'text' })
  comment!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @RelationId((review: Review) => review.user)
  userId!: number;

  @ManyToOne(() => DomesticAnimal, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'domesticAnimalId' })
  domesticAnimal!: DomesticAnimal;

  @RelationId((review: Review) => review.domesticAnimal)
  domesticAnimalId!: number;
}
