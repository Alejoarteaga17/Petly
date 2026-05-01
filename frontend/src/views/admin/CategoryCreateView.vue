<!-- Author: Alejandro Arteaga -->
<script setup lang="ts">
// External imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import { CategoryService } from '@/services/CategoryService';
import type { CreateCategoryDTO } from '@/dtos/CreateCategoryDTO';
import CategoryFormFields from '@/components/CategoryFormFields.vue';

const router = useRouter();

// Form data for the category creation
const form = ref<CreateCategoryDTO>({
  species: '',
  image: '',
});
const successMessage = ref('');
const errorMessage = ref('');

async function submitForm() {
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await CategoryService.createCategory(form.value);
    successMessage.value = 'Category created successfully!';
    await router.push({ name: 'admin.categories' });
    form.value = {
      species: '',
      image: '',
    };
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Error creating category. Please verify all fields.';
  }
}
</script>

<template>
  <section class="max-w-2xl mx-auto py-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-8">Create a New Category</h2>
    <form class="bg-white rounded-lg shadow-md p-8 space-y-6" @submit.prevent="submitForm">
      <CategoryFormFields v-model="form" />

      <div class="flex flex-wrap items-center gap-3 pt-4">
        <button
          type="submit"
          class="rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
        >
          Create Category
        </button>

        <RouterLink
          :to="{ name: 'admin.categories' }"
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
