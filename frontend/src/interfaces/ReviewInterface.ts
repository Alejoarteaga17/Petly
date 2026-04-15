export interface ReviewInterface {
  id: number;
  domesticAnimalId: number;
  rating: number;
  comment: string;
  author?: string;
  createdAt?: string;
}
