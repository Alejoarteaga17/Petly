// Author: Alejandro Arteaga & Alejandra Suarez
import type { UserInterface } from './UserInterface';
// Extend the frontend interface to include the related domestic animal
// so profile views can access review context directly.
export interface ReviewInterface {
  id: number;
  domesticAnimalId: number;
  rating: number;
  comment: string;
  createdAt: string;
  userId: number;
  user?: UserInterface;
  domesticAnimal?: {
    id: number;
    breed: string;
    category?: string;
  };
}
