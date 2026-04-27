<!-- Authors: Alejandra Suarez -->
<script setup lang="ts">
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import { onMounted, ref } from 'vue';

// Default image on case the url is invalid
const DEFAULT_IMAGE = 'https://placedog.net/536/355';

// Reactive variables
const domesticAnimals = ref<DomesticAnimalInterface[]>([]);

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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="domesticAnimal in domesticAnimals" :key="domesticAnimal.id">
          <div
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 border border-gray-200"
          >
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-semibold text-gray-800">
                {{ domesticAnimal.breed }}
              </h3>
            </div>

            <div class="flex justify-center mb-4">
              <img
                :src="getCardImage(domesticAnimal.image)"
                @error="handleCardImageError"
                alt="Domestic Animal"
                class="object-cover rounded shadow-sm w-full h-auto"
              />
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
