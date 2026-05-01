<!-- Author: Alejandro Arteaga & Camila Velez -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { CreateDomesticAnimalDTO } from '@/dtos/CreateDomesticAnimalDTO';
import type { CategoryInterface } from '@/interfaces/CategoryInterface';
import { CategoryService } from '@/services/CategoryService';

const props = defineProps<{
  modelValue: CreateDomesticAnimalDTO;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: CreateDomesticAnimalDTO): void;
}>();

const categories = ref<CategoryInterface[]>([]);
const loadingCategories = ref(true);

function updateField<K extends keyof CreateDomesticAnimalDTO>(
  key: K,
  value: CreateDomesticAnimalDTO[K],
) {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value,
  });
}

onMounted(async () => {
  try {
    categories.value = await CategoryService.getAll();
  } catch (error) {
    console.error('Error loading categories:', error);
  } finally {
    loadingCategories.value = false;
  }
});
</script>

<template>
  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="breed">Breed</label>
    <input
      :value="modelValue.breed"
      type="text"
      name="breed"
      id="breed"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      placeholder="e.g. Labrador Retriever"
      @input="updateField('breed', ($event.target as HTMLInputElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="categoryId">Category</label>
    <select
      :value="modelValue.categoryId"
      name="categoryId"
      id="categoryId"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      :disabled="loadingCategories"
      @change="updateField('categoryId', Number(($event.target as HTMLSelectElement).value))"
    >
      <option value="" disabled>{{ loadingCategories ? 'Loading categories...' : 'Select a category' }}</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.species }}
      </option>
    </select>
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="description">Description</label>
    <textarea
      :value="modelValue.description"
      id="description"
      rows="4"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      placeholder="e.g. Friendly, active, good with children"
      @input="updateField('description', ($event.target as HTMLTextAreaElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="lifeExpectancy"
      >Life Expectancy</label
    >
    <input
      :value="modelValue.lifeExpectancy"
      type="number"
      name="lifeExpectancy"
      id="lifeExpectancy"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      min="0"
      step="1"
      inputmode="numeric"
      placeholder="e.g. 12 (years)"
      @input="updateField('lifeExpectancy', ($event.target as HTMLInputElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="weight">Weight</label>
    <input
      :value="modelValue.weight"
      type="number"
      name="weight"
      id="weight"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      min="0"
      step="0.1"
      inputmode="decimal"
      placeholder="e.g. 4.5 (kg)"
      @input="updateField('weight', ($event.target as HTMLInputElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="height">Height</label>
    <input
      :value="modelValue.height"
      type="number"
      name="height"
      id="height"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      min="0"
      step="0.1"
      inputmode="decimal"
      placeholder="e.g. 35 (cm)"
      @input="updateField('height', ($event.target as HTMLInputElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="behaviours">Behaviours</label>
    <textarea
      :value="modelValue.behaviours"
      id="behaviours"
      rows="3"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      placeholder="e.g. Calm, playful, protective"
      @input="updateField('behaviours', ($event.target as HTMLTextAreaElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="commonDisease">Common Disease</label>
    <input
      :value="modelValue.commonDisease"
      type="text"
      name="commonDisease"
      id="commonDisease"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      placeholder="e.g. Hip dysplasia"
      @input="updateField('commonDisease', ($event.target as HTMLInputElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="countryOrigin">Country Origin</label>
    <input
      :value="modelValue.countryOrigin"
      type="text"
      name="countryOrigin"
      id="countryOrigin"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      placeholder="e.g. Colombia"
      @input="updateField('countryOrigin', ($event.target as HTMLInputElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="history">History</label>
    <textarea
      :value="modelValue.history"
      id="history"
      rows="4"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      placeholder="e.g. Originally bred for companionship"
      @input="updateField('history', ($event.target as HTMLTextAreaElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="image">Image URL</label>
    <input
      :value="modelValue.image"
      type="url"
      name="image"
      id="image"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      placeholder="https://example.com/image.jpg"
      @input="updateField('image', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
