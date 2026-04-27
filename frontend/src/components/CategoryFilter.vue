<!-- Authors: Alejandra Suarez -->
<script setup lang="ts">
interface Props {
  categories: string[];
  modelValue: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Categories',
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

function selectCategory(category: string) {
  emit('update:modelValue', category);
}
</script>

<template>
  <div class="mb-8">
    <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
    <div class="mt-4 flex flex-wrap gap-3">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        class="rounded-full border px-4 py-2 text-sm font-semibold transition"
        :class="modelValue === category
          ? 'border-orange-500 bg-orange-500 text-white shadow-sm'
          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700'"
        @click="selectCategory(category)"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>
