import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';

export type CreateDomesticAnimalDTO = Omit<DomesticAnimalInterface, 'id'>;
