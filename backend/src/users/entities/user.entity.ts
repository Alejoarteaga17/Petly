// Author: Alejandro Arteaga
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from '../../domesticAnimals/entities/review.entity';

// We defiine the possible user roles as a constant array and a type for better type safety
// this means we can only use admin or user, numeric type bc of the array positions
export const USER_ROLES = ['user', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: 'simple-enum', enum: USER_ROLES, default: 'user' })
  role!: UserRole;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false })
  password!: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];
}
