import { Review } from './review.entity';
import { Category } from '../../categories/entities/category.entity';
export declare class DomesticAnimal {
    id: number;
    breed: string;
    description: string;
    lifeExpectancy: string;
    weight: string;
    height: string;
    behaviours: string;
    commonDisease: string;
    countryOrigin: string;
    history: string;
    image: string;
    category: Category;
    categoryId: number | null;
    reviews: Review[];
}
