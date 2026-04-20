// Author: Alejandro Arteaga & Alejandra Suarez
import type { UserInterface } from './UserInterface';
// Modificamos la interfaz del front para poder acceder al animal desde la reseña asociada
// desde el perfil del usuario
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
