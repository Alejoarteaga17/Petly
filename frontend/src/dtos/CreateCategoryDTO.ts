// Author: Alejandro Arteaga

import type { CategoryInterface } from '@/interfaces/CategoryInterface';

export type CreateCategoryDTO = Omit<CategoryInterface, 'id' | 'domesticAnimals'>;
