import { DomesticAnimal } from './domesticAnimal.entity';
import { User } from '../../users/entities/user.entity';
export declare class Review {
    id: number;
    rating: number;
    comment: string;
    createdAt: Date;
    user: User;
    userId: number;
    domesticAnimal: DomesticAnimal;
    domesticAnimalId: number;
}
