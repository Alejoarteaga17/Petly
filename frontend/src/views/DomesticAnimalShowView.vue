<script setup lang="ts">
import DomesticAnimalReviews from '@/components/DomesticAnimalReviews.vue';
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const DEFAULT_IMAGE = 'https://placedog.net/536/355';

const domesticAnimal = ref<DomesticAnimalInterface | null>(null);
const imageSrc = ref(DEFAULT_IMAGE);

function handleImageError() {
  imageSrc.value = DEFAULT_IMAGE;
}

onMounted(async () => { 
  const route = useRoute(); 
  const domesticAnimalId = Number(route.params.id); 
  domesticAnimal.value = await DomesticAnimalService.getById(domesticAnimalId); 
  imageSrc.value = domesticAnimal.value?.image?.trim() || DEFAULT_IMAGE;
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
        </div>
      </div>
    </div>
  </section>
</template>
