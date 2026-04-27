<!-- Authors: Alejandro Arteaga and Alejandra Suarez -->
<script setup lang="ts"> 
// External imports
import { computed, onMounted, ref } from 'vue'; 
// Internal imports
import CategoryFilter from '@/components/CategoryFilter.vue';
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface'; 
 
// Default image on case the url is invalid
const DEFAULT_IMAGE = 'https://placedog.net/536/355';

// Reactive variables
const domesticAnimals = ref<DomesticAnimalInterface[]>([]); 
const selectedCategory = ref('All');
const searchQuery = ref('');
const sortOrder = ref('');

const categories = computed(() => {
  const uniqueCategories = new Set<string>();

  for (const animal of domesticAnimals.value) {
    uniqueCategories.add(animal.category);
  }

  return ['All', ...Array.from(uniqueCategories).sort()];
});

const filteredDomesticAnimals = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase();

  return domesticAnimals.value.filter((animal) => {
      const matchesCategory =
        selectedCategory.value === 'All' || animal.category === selectedCategory.value;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return [animal.breed, animal.category, animal.description]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);
    })
    .sort((firstAnimal, secondAnimal) => {
      if (sortOrder.value === '') {
        return 0;
      }

      const firstName = firstAnimal.breed.toLowerCase();
      const secondName = secondAnimal.breed.toLowerCase();

      return sortOrder.value === 'za'
        ? secondName.localeCompare(firstName)
        : firstName.localeCompare(secondName);
    });
});

function getCardImage(image?: string) {
  return image?.trim() || DEFAULT_IMAGE;
}

function handleCardImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = DEFAULT_IMAGE;
}
 
onMounted(async () => { 
  domesticAnimals.value = await DomesticAnimalService.getAll(); 
}); 
</script> 
 
<template> 
  <section> 
    <div class="max-w-7xl mx-auto"> 
      <div class="flex w-full flex-wrap justify-end gap-4 mb-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div class="flex flex-col items-start w-full sm:min-w-[28rem] lg:min-w-[38rem] flex-[2]">
          <label for="animal-search" class="mb-1 text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            id="animal-search"
            v-model="searchQuery"
            type="text"
            placeholder="Search by breed"
            class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        <div class="flex flex-col items-start">
          <label for="animal-sort" class="mb-1 text-sm font-medium text-gray-700">
            Sort Alphabetically
          </label>
          <select
            id="animal-sort"
            v-model="sortOrder"
            class="min-w-44 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          >
            <option value="">All</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
      </div>

      <CategoryFilter v-model="selectedCategory" :categories="categories" />
 
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
        <div v-for="domesticAnimal in filteredDomesticAnimals" :key="domesticAnimal.id"> 
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 border border-gray-200"> 
            <div class="flex justify-between items-center mb-2"> 
              <h3 class="text-xl font-semibold text-gray-800"> 
                {{ domesticAnimal.breed }} 
              </h3>
            </div>

            <div class="flex justify-center mb-4">
              <div class="w-full overflow-hidden rounded-lg bg-gray-100 aspect-[4/3]">
              <img
                :src="getCardImage(domesticAnimal.image)"
                @error="handleCardImageError"
                alt="Domestic Animal"
                class="h-full w-full object-cover"
              />
              </div>
            </div>

            <p class="text-gray-700 text-lg font-bold mb-3">
              {{ domesticAnimal.category }}
            </p>

            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ domesticAnimal.description }}
            </p>

            <div class="flex justify-center">
              <RouterLink
                :to="`/domesticAnimals/${domesticAnimal.id}`"
                class="bg-yellow-100 hover:bg-orange-200 text-orange-700 font-semibold py-2 px-3 rounded transition duration-300"
              >
                More info <i class="fas fa-info-circle"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
