<!-- Author: Alejandro Arteaga -->
<script setup lang="ts">
// Internal imports
type CategoryFormModel = {
  species: string;
  image: string;
};

const model = defineModel<CategoryFormModel>({ required: true });
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div>
      <label class="mb-1 block text-sm font-semibold text-gray-600" for="species">Species</label>
      <input
        id="species"
        v-model="model.species"
        type="text"
        class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-300 focus:outline-none focus:ring"
        required
        placeholder="e.g. Dog, Cat, Bird"
      />
    </div>

    <div>
      <label class="mb-1 block text-sm font-semibold text-gray-600" for="image">Image URL</label>
      <input
        id="image"
        v-model="model.image"
        type="url"
        class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-300 focus:outline-none focus:ring"
        required
        placeholder="https://example.com/image.jpg"
      />
    </div>
  </div>
</template>
