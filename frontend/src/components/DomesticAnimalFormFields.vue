<!-- Author: Alejandro Arteaga -->
<script setup lang="ts">
import type { CreateDomesticAnimalDTO } from '@/dtos/CreateDomesticAnimalDTO';

const props = defineProps<{
  modelValue: CreateDomesticAnimalDTO;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: CreateDomesticAnimalDTO): void;
}>();

function updateField<K extends keyof CreateDomesticAnimalDTO>(key: K, value: CreateDomesticAnimalDTO[K]) {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value,
  });
}
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
      placeholder="Breed"
      @input="updateField('breed', ($event.target as HTMLInputElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="category">Category</label>
    <input
      :value="modelValue.category"
      type="text"
      name="category"
      id="category"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      placeholder="Category"
      @input="updateField('category', ($event.target as HTMLInputElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="description">Description</label>
    <textarea
      :value="modelValue.description"
      id="description"
      rows="4"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      placeholder="Description"
      @input="updateField('description', ($event.target as HTMLTextAreaElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="lifeExpectancy">Life Expectancy</label>
    <input
      :value="modelValue.lifeExpectancy"
      type="text"
      name="lifeExpectancy"
      id="lifeExpectancy"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      placeholder="Life expectancy"
      @input="updateField('lifeExpectancy', ($event.target as HTMLInputElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="weight">Weight</label>
    <input
      :value="modelValue.weight"
      type="text"
      name="weight"
      id="weight"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      placeholder="Weight"
      @input="updateField('weight', ($event.target as HTMLInputElement).value)"
    />
  </div>

  <div>
    <label class="block text-gray-700 font-semibold mb-2" for="height">Height</label>
    <input
      :value="modelValue.height"
      type="text"
      name="height"
      id="height"
      class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
      required
      placeholder="Height"
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
      placeholder="Behaviours"
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
      placeholder="Common disease"
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
      placeholder="Country of origin"
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
      placeholder="History"
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
