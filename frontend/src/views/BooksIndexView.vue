<script setup lang="ts"> 
import { DomesticAnimalService } from '@/services/domesticAnimalService.js'; 
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface.js'; 
import { onMounted, ref } from 'vue'; 
 
const domesticAnimals = ref<DomesticAnimalInterface[]>([]); 
 
onMounted(async () => { 
  domesticAnimals.value = await DomesticAnimalService.getDomesticAnimals(); 
}); 
</script> 
 
<template> 
  <section> 
    <div class="max-w-7xl mx-auto"> 
      <div class="flex justify-end mb-6"> 
        <RouterLink 
          to="/domesticAnimals/create" 
          class="inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded hover:bg-blue-700 transition" 
          >+ Add Domestic Animal</RouterLink 
        > 
      </div> 
 
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
        <div v-for="domesticAnimal in domesticAnimals" :key="domesticAnimal.id"> 
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 border border-gray-200"> 
            <div class="flex justify-between items-center mb-2"> 
              <h3 class="text-xl font-semibold text-gray-800"> 
                {{ domesticAnimal.breed }} 
              </h3>
            </div> 

            <div class="flex justify-center mb-4"> 
              <img src="https://picsum.photos/seed/picsum/536/354" alt="Domestic Animal" class="object-cover rounded shadow-sm w-full h-auto" /> 
            </div> 

            <p class="text-gray-500 text-sm mb-3"> 
              <i class="fas fa-tag mr-2"></i> 
              {{ domesticAnimal.category }} 
            </p> 

            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ domesticAnimal.description }}
            </p>
 
            <div class="flex justify-center"> 
              <RouterLink 
                :to="`/domesticAnimals/${domesticAnimal.id}`" 
                class="bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold py-2 px-3 rounded transition duration-300" 
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