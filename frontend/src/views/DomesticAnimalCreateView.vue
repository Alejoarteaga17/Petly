<script setup lang="ts">
import { ref } from 'vue';
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import type { CreateDomesticAnimalDTO } from '@/dtos/CreateDomesticAnimalDTO';

const breed = ref('');
const category = ref('');
const description = ref('');
const lifeExpectancy = ref('');
const weight = ref('');
const height = ref('');
const behaviours = ref('');
const commonDisease = ref('');
const countryOrigin = ref('');
const history = ref('');
const image = ref('');
const successMessage = ref('');
const errorMessage = ref('');

async function submitForm() {
  successMessage.value = '';
  errorMessage.value = '';

  const newDomesticAnimal: CreateDomesticAnimalDTO = {
    breed: breed.value,
    category: category.value,
    description: description.value,
    lifeExpectancy: lifeExpectancy.value,
    weight: weight.value,
    height: height.value,
    behaviours: behaviours.value,
    commonDisease: commonDisease.value,
    countryOrigin: countryOrigin.value,
    history: history.value,
    image: image.value
  };

  try {
      await DomesticAnimalService.createDomesticAnimal(newDomesticAnimal);
      successMessage.value = 'Domestic animal created successfully!';
      breed.value = '';
      category.value = '';
      description.value = '';
      lifeExpectancy.value = '';
      weight.value = '';
      height.value = '';
      behaviours.value = '';
      commonDisease.value = '';
      countryOrigin.value = '';
      history.value = '';
      image.value = '';
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

      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="lifeExpectancy">Life Expectancy</label>
        <input
          v-model="lifeExpectancy"
          type="text"
          name="lifeExpectancy"
          id="lifeExpectancy"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="Life expectancy"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="weight">Weight</label>
        <input
          v-model="weight"
          type="text"
          name="weight"
          id="weight"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="Weight"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="height">Height</label>
        <input
          v-model="height"
          type="text"
          name="height"
          id="height"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="Height"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="behaviours">Behaviours</label>
        <textarea
          v-model="behaviours"
          id="behaviours"
          rows="3"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="Behaviours"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="commonDisease">Common Disease</label>
        <input
          v-model="commonDisease"
          type="text"
          name="commonDisease"
          id="commonDisease"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="Common disease"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="countryOrigin">Country Origin</label>
        <input
          v-model="countryOrigin"
          type="text"
          name="countryOrigin"
          id="countryOrigin"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="Country of origin"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="history">History</label>
        <textarea
          v-model="history"
          id="history"
          rows="4"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="History"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="image">Image URL</label>
        <input
          v-model="image"
          type="url"
          name="image"
          id="image"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          required
          placeholder="https://example.com/image.jpg"
        />
      </div>

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
