// Author: Alejandro Arteaga

import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';

export interface CategoryInterface {
  id: number;
  species: string;
  image: string;
  domesticAnimals?: DomesticAnimalInterface[];
}
