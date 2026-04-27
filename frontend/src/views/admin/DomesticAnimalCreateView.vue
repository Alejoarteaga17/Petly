<!-- Author: Alejandro Arteaga -->
<script setup lang="ts">
import { ref } from 'vue';
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import type { CreateDomesticAnimalDTO } from '@/dtos/CreateDomesticAnimalDTO';
import DomesticAnimalFormFields from '@/components/DomesticAnimalFormFields.vue';

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
  }
  catch (error) {
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

      <div class="pt-4">
        <button
          type="submit"
          class="w-full bg-orange-500 text-white font-semibold py-3 rounded hover:bg-orange-600 transition"
        >
          Create Domestic Animal
        </button>
      </div>

      <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
    </form>
  </section>
</template>
