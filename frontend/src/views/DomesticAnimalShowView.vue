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
      <div class="mb-4">
        <RouterLink
          :to="{ name: 'domesticAnimals' }"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Back to domestic animals</span>
        </RouterLink>
      </div>

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
                    "{{ domesticAnimal.breed }}" is an outstanding domestic animal in the
                    {{ domesticAnimal.category }} category. This profile is part of our collection
                    and helps users discover useful details about different domestic animals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Domestic Animal Information</h3>
              <div class="overflow-x-auto rounded-lg border border-gray-200">
                <table class="min-w-full divide-y divide-gray-200 text-left text-sm">
                  <tbody class="divide-y divide-gray-100 bg-white">
                    <tr>
                      <th class="w-1/3 bg-gray-50 px-4 py-3 font-semibold text-gray-600">Breed</th>
                      <td class="px-4 py-3 font-medium text-gray-800">
                        {{ domesticAnimal.breed }}
                      </td>
                    </tr>
                    <tr>
                      <th class="w-1/3 bg-gray-50 px-4 py-3 font-semibold text-gray-600">
                        Category
                      </th>
                      <td class="px-4 py-3 font-medium text-gray-800">
                        {{ domesticAnimal.category }}
                      </td>
                    </tr>
                    <tr>
                      <th class="w-1/3 bg-gray-50 px-4 py-3 font-semibold text-gray-600">
                        Description
                      </th>
                      <td class="px-4 py-3 font-medium text-gray-800">
                        {{ domesticAnimal.description }}
                      </td>
                    </tr>
                    <tr>
                      <th class="w-1/3 bg-gray-50 px-4 py-3 font-semibold text-gray-600">
                        Life Expectancy
                      </th>
                      <td class="px-4 py-3 font-medium text-gray-800">
                        {{ domesticAnimal.lifeExpectancy }}
                      </td>
                    </tr>
                    <tr>
                      <th class="w-1/3 bg-gray-50 px-4 py-3 font-semibold text-gray-600">Weight</th>
                      <td class="px-4 py-3 font-medium text-gray-800">
                        {{ domesticAnimal.weight }}
                      </td>
                    </tr>
                    <tr>
                      <th class="w-1/3 bg-gray-50 px-4 py-3 font-semibold text-gray-600">Height</th>
                      <td class="px-4 py-3 font-medium text-gray-800">
                        {{ domesticAnimal.height }}
                      </td>
                    </tr>
                    <tr>
                      <th class="w-1/3 bg-gray-50 px-4 py-3 font-semibold text-gray-600">
                        Behaviours
                      </th>
                      <td class="px-4 py-3 font-medium text-gray-800">
                        {{ domesticAnimal.behaviours }}
                      </td>
                    </tr>
                    <tr>
                      <th class="w-1/3 bg-gray-50 px-4 py-3 font-semibold text-gray-600">
                        Common Disease
                      </th>
                      <td class="px-4 py-3 font-medium text-gray-800">
                        {{ domesticAnimal.commonDisease }}
                      </td>
                    </tr>
                    <tr>
                      <th class="w-1/3 bg-gray-50 px-4 py-3 font-semibold text-gray-600">
                        Country Origin
                      </th>
                      <td class="px-4 py-3 font-medium text-gray-800">
                        {{ domesticAnimal.countryOrigin }}
                      </td>
                    </tr>
                    <tr>
                      <th class="w-1/3 bg-gray-50 px-4 py-3 font-semibold text-gray-600">
                        History
                      </th>
                      <td class="px-4 py-3 font-medium text-gray-800">
                        {{ domesticAnimal.history }}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
