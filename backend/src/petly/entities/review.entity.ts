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
 
@Entity() 
export class Review { 
  @PrimaryGeneratedColumn() 
  id: number; 
 
  @ManyToOne(() => DomesticAnimal, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'domesticAnimalId' }) 
  domesticAnimal: DomesticAnimal; 
 
  @RelationId((review: Review) => review.domesticAnimal) 
  domesticAnimalId: number; 
 
  @Column({ type: 'int' }) 
  rating: number; 
 
  @Column({ type: 'text' }) 
  comment: string; 
 
  @Column({ type: 'varchar', nullable: true }) 
  author: string | null; 
 
  @CreateDateColumn() 
  createdAt: Date; 
} 