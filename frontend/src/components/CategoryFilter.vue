<!-- Authors: Alejandra Suarez -->
<script setup lang="ts">
interface CategoryShape {
  id?: number;
  species: string;
  image?: string;
}

interface Props {
  // Accept either an array of species strings or category objects with image
  categories: Array<string | CategoryShape>;
  modelValue: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Categories',
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

function selectCategory(category: string | CategoryShape) {
  const value = typeof category === 'string' ? category : category.species;
  emit('update:modelValue', value);
}

function getLabel(category: string | CategoryShape) {
  return typeof category === 'string' ? category : category.species;
}

function getImageSrc(category: string | CategoryShape) {
  if (typeof category === 'string') return null;
  return category.image ?? null;
}

const DEFAULT_CAT_IMAGE = 'https://placehold.co/200x200?text=?';

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = DEFAULT_CAT_IMAGE;
}
</script>

<template>
  <div class="mb-8">
    <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>

    <div class="mt-4 flex flex-wrap gap-6 justify-center">
      <div
        v-for="category in categories"
        :key="typeof category === 'string' ? category : (category.id ?? category.species)"
        class="flex flex-col items-center text-center"
      >
        <button
          type="button"
          :aria-label="getLabel(category)"
          class="flex items-center justify-center rounded-full overflow-hidden border w-16 h-16 md:w-20 md:h-20 transition-all duration-300"
          :class="modelValue === getLabel(category)
            ? 'bg-orange-500 text-white shadow-xl border-orange-400 ring-2 ring-orange-400'
            : 'bg-white text-gray-700 border-gray-200 hover:bg-orange-500 hover:text-white hover:-translate-y-1 hover:shadow-xl hover:border-orange-200'"
          @click="selectCategory(category)"
        >
          <template v-if="getImageSrc(category)">
            <img :src="getImageSrc(category) as string" alt="" class="w-full h-full object-cover" @error="handleImageError" />
          </template>
          <template v-else>
            <span class="text-sm font-semibold text-gray-700">
              {{ getLabel(category).charAt(0).toUpperCase() }}
            </span>
          </template>
        </button>

        <div class="mt-2 text-sm font-medium text-gray-700">{{ getLabel(category) }}</div>
      </div>
    </div>
  </div>
</template>
