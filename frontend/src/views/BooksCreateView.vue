<script setup lang="ts">
import { ref } from 'vue';
import { DomesticAnimalService } from '@/services/domesticAnimalService.js';
import type { CreateDomesticAnimalDTO } from '@/dtos/CreateDomesticAnimalDTO.js';

const breed = ref('');
const category = ref('');
const description = ref('');
const successMessage = ref('');

async function submitForm() {
  const newDomesticAnimal: CreateDomesticAnimalDTO = {
    breed: breed.value,
    category: category.value,
    description: description.value,
  };
  try {
      await DomesticAnimalService.createDomesticAnimal(newDomesticAnimal);
      successMessage.value = 'Domestic animal created successfully!';
      breed.value = '';
      category.value = '';
      description.value = '';
  }
  catch (error) {
      console.error(error)
  }
}
</script>
<template>
  <section class="max-w-2xl mx-auto py-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-8">Create a New Domestic Animal</h2>
    <form class="bg-white rounded-lg shadow-md p-8 space-y-6" @submit.prevent="submitForm">
      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="breed">Breed</label>
        <input
          v-model="breed"
          type="text"
          name="breed"
          id="breed"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="Breed"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="category">Category</label>
        <input
          v-model="category"
          type="text"
          name="category"
          id="category"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="Category"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="description">Description</label>
        <textarea
          v-model="description"
          id="description"
          rows="4"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="Description"
        />
      </div>

      <div class="pt-4">
        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
        >
          Create Domestic Animal
        </button>
      </div>

      <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
    </form>
  </section>
</template>
