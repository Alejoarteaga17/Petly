<!-- Authors: Alejandra Suarez & Alejandro Arteaga  -->
<script setup lang="ts">
// External imports
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// Internal imports
import DomesticAnimalReviews from '@/components/DomesticAnimalReviews.vue';
import PopularityChart from '@/components/PopularityChart.vue';
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import { ReviewService } from '@/services/ReviewService';

const DEFAULT_IMAGE = 'https://placedog.net/536/355';

const domesticAnimal = ref<DomesticAnimalInterface | null>(null);
const imageSrc = ref(DEFAULT_IMAGE);
const reviews = ref<ReviewInterface[]>([]);
const domesticAnimals = ref<DomesticAnimalInterface[]>([]);

function handleImageError() {
  imageSrc.value = DEFAULT_IMAGE;
}

const popularityData = computed(() => {
  const animalById = new Map<number, DomesticAnimalInterface>();
  for (const animal of domesticAnimals.value) {
    animalById.set(animal.id, animal);
  }

  const popularityMap = new Map<string, number>();
  for (const review of reviews.value) {
    const animal = animalById.get(review.domesticAnimalId);
    const breed = animal?.breed || `Animal #${review.domesticAnimalId}`;
    popularityMap.set(breed, (popularityMap.get(breed) ?? 0) + 1);
  }

  return Array.from(popularityMap.entries())
    .map(([breed, reviewsCount]) => ({ breed, reviewsCount }))
    .sort((a, b) => b.reviewsCount - a.reviewsCount);
});

onMounted(async () => { 
  const route = useRoute(); 
  const domesticAnimalId = Number(route.params.id); 
  domesticAnimal.value = await DomesticAnimalService.getById(domesticAnimalId); 
  imageSrc.value = domesticAnimal.value?.image?.trim() || DEFAULT_IMAGE;

  try {
    const [animalsData, reviewsData] = await Promise.all([
      DomesticAnimalService.getAll(),
      ReviewService.getReviews(),
    ]);
    
    domesticAnimals.value = animalsData;
    reviews.value = reviewsData;
  } catch (error) {
    console.error('Error loading data:', error);
  }
}); 
</script>

<template>
  <section v-if="domesticAnimal">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 gap-12">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-8 mb-8">
            <div class="flex items-start space-x-8">
              <div>
                <img
                  :src="imageSrc"
                  @error="handleImageError"
                  alt="Domestic Animal"
                  class="object-cover rounded shadow-sm w-72 h-auto"
                />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ domesticAnimal.breed }}</h2>
                <div class="prose text-gray-600">
                  <p class="mb-4">
                    "{{ domesticAnimal.breed }}" is an outstanding domestic animal in the {{ domesticAnimal.category }} category.
                    This profile is part of our collection and helps users discover useful details
                    about different domestic animals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Domestic Animal Information</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Breed:</span>
                  <span class="font-medium">
                    {{ domesticAnimal.breed }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Category:</span>
                  <span class="font-medium">
                    {{ domesticAnimal.category }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Description:</span>
                  <span class="font-medium text-right max-w-[70%]">
                    {{ domesticAnimal.description }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 mt-8">
            <DomesticAnimalReviews :domestic-animal-id="domesticAnimal.id" />
          </div>

          <div class="bg-white rounded-lg shadow-md p-6 mt-8">
            <PopularityChart :data="popularityData" title="Popularity" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
