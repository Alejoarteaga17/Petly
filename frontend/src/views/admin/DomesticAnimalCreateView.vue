<!-- Author: Alejandro Arteaga -->
<script setup lang="ts">
// External imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Internal imports
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import type { CreateDomesticAnimalDTO } from '@/dtos/CreateDomesticAnimalDTO';
import DomesticAnimalFormFields from '@/components/DomesticAnimalFormFields.vue';

const router = useRouter();

// Form data for the domestic animal creation
const form = ref<CreateDomesticAnimalDTO>({
  breed: '',
  category: '',
  description: '',
  lifeExpectancy: '',
  weight: '',
  height: '',
  behaviours: '',
  commonDisease: '',
  countryOrigin: '',
  history: '',
  image: '',
});
const successMessage = ref('');
const errorMessage = ref('');

async function submitForm() {
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await DomesticAnimalService.createDomesticAnimal(form.value);
    successMessage.value = 'Domestic animal created successfully!';
    await router.push({ name: 'admin.manageDomesticAnimals' });
    form.value = {
      breed: '',
      category: '',
      description: '',
      lifeExpectancy: '',
      weight: '',
      height: '',
      behaviours: '',
      commonDisease: '',
      countryOrigin: '',
      history: '',
      image: '',
    };
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Error creating domestic animal. Please verify all fields.';
  }
}
</script>
<template>
  <section class="max-w-2xl mx-auto py-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-8">Create a New Domestic Animal</h2>
    <form class="bg-white rounded-lg shadow-md p-8 space-y-6" @submit.prevent="submitForm">
      <DomesticAnimalFormFields v-model="form" />

      <div class="flex flex-wrap items-center gap-3 pt-4">
        <button
          type="submit"
          class="rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
        >
          Create Domestic Animal
        </button>

        <RouterLink
          :to="{ name: 'admin.manageDomesticAnimals' }"
          class="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300"
        >
          Cancel
        </RouterLink>
      </div>

      <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
    </form>
  </section>
</template>
