// Author: Alejandra Suarez

import type { CategoryInterface } from '@/interfaces/CategoryInterface';

export interface DomesticAnimalInterface {
  id: number;
  breed: string;
  categoryId: number;
  category?: CategoryInterface;
  description: string;
  lifeExpectancy: string;
  weight: string;
  height: string;
  behaviours: string;
  commonDisease: string;
  countryOrigin: string;
  history: string;
  image: string;
  reviews?: string;
}
