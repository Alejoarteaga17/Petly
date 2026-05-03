import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';

export interface PopularityRow {
  [key: string]: string | number;
  breed: string;
  reviewsCount: number;
}

export function computePopularityByBreed(
  animals: DomesticAnimalInterface[],
  reviews: ReviewInterface[],
): PopularityRow[] {
  const animalById = new Map<number, DomesticAnimalInterface>();
  for (const animal of animals) {
    animalById.set(animal.id, animal);
  }

  const popularityMap = new Map<string, number>();
  for (const review of reviews) {
    const animal = animalById.get(review.domesticAnimalId);
    const breed = animal?.breed || `Animal #${review.domesticAnimalId}`;
    popularityMap.set(breed, (popularityMap.get(breed) ?? 0) + 1);
  }

  return Array.from(popularityMap.entries())
    .map(([breed, reviewsCount]) => ({ breed, reviewsCount }))
    .sort((a, b) => b.reviewsCount - a.reviewsCount);
}
