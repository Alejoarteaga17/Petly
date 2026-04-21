<script setup lang="ts"> 
// Author: Alejandro Arteaga & Alejandra Suarez 
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface'; 
import type { UserInterface } from '@/interfaces/UserInterface';
import { UserService } from '@/services/UserService';
import { computed, onMounted, ref } from 'vue'; 
 
// Default image on case the url is invalid
const DEFAULT_IMAGE = 'https://placedog.net/536/355';

// Reactive variables
const domesticAnimals = ref<DomesticAnimalInterface[]>([]); 
const authUser = ref<UserInterface | null>(null);

// Computed property to check if the user is an admin
const isAdmin = computed(() => authUser.value?.role === 'admin');

// Function to load the auth user
function loadAuthUser() {
  const stored = localStorage.getItem('authUser');
  if (!stored) {
    authUser.value = null;
    return;
  }

  try {
    authUser.value = JSON.parse(stored) as UserInterface;
  } catch (error) {
    console.error(error);
    localStorage.removeItem('authUser');
    authUser.value = null;
  }
}
// If we change somthing user related in the DB directly, this will make sure we have the freshest data.
async function refreshAuthUserFromBackend() {
  if (!authUser.value) return;

  try {
    const freshUser = await UserService.getById(authUser.value.id);
    authUser.value = freshUser;
    localStorage.setItem('authUser', JSON.stringify(freshUser));
  } catch (error) {
    console.error(error);
  }
}

function getCardImage(image?: string) {
  return image?.trim() || DEFAULT_IMAGE;
}

function handleCardImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = DEFAULT_IMAGE;
}
 
onMounted(async () => { 
  loadAuthUser();
  await refreshAuthUserFromBackend();
  domesticAnimals.value = await DomesticAnimalService.getAll(); 
}); 
</script> 
 
<template> 
  <section> 
    <div class="max-w-7xl mx-auto"> 
      <div v-if="isAdmin" class="flex justify-end mb-6"> 
        <RouterLink 
          to="/domesticAnimals/create" 
          class="inline-block bg-orange-400 text-white font-semibold px-5 py-2 rounded hover:bg-orange-500 transition" 
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