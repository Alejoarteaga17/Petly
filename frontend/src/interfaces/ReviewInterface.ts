import type { UserInterface } from './UserInterface';

export interface ReviewInterface {
  id: number;
  domesticAnimalId: number;
  rating: number;
  comment: string;
  createdAt: string;
  userId: number;
  user?: UserInterface;
}
