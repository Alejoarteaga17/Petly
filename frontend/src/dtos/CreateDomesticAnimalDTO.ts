// Author: Alejandro Arteaga

import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';

export type CreateDomesticAnimalDTO = Omit<DomesticAnimalInterface, 'id' | 'category' | 'reviews'> & {
  categoryId: number;
};
