import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  role!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false })
  password!: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];
}
