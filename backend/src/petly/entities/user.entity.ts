import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column()
  email!: string;

  @Column()
  role!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];
}
