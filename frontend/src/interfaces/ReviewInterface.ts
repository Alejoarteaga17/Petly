// Autor: Camila Velez

export interface ReviewInterface {
  id: number;
  domesticAnimalId: number;
  rating: number;
  userId: string;
  comment: string;
  createdAt?: string;
}
