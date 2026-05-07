<!-- Author: Alejandro Arteaga -->
<script setup lang="ts">
// External imports
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Internal imports
import CategoryFormFields from '@/components/CategoryFormFields.vue';
import { CategoryService } from '@/services/CategoryService';
import type { CreateCategoryDTO } from '@/dtos/CreateCategoryDTO';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const saving = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const form = ref<CreateCategoryDTO>({
  species: '',
  image: '',
});

async function loadCategory() {
  loading.value = true;
  errorMessage.value = '';

  try {
    const categoryId = Number(route.params.id);
    const category = await CategoryService.getById(categoryId);

    form.value = {
      species: category.species,
      image: category.image,
    };
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Could not load the category details.';
  } finally {
    loading.value = false;
  }
}

async function submitForm() {
  saving.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const categoryId = Number(route.params.id);
    await CategoryService.updateCategory(categoryId, form.value);
    successMessage.value = 'Category updated successfully!';
    await router.push({ name: 'admin.categories' });
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Error updating category. Please verify all fields.';
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  loadCategory();
});
</script>

<template>
  <section class="max-w-2xl mx-auto py-8">
    <div class="mb-4">
      <RouterLink
        :to="{ name: 'admin.categories' }"
        class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Back to categories</span>
      </RouterLink>
    </div>

    <h2 class="text-2xl font-bold text-gray-800 mb-8">Edit Category</h2>

    <p v-if="loading" class="text-sm text-gray-500">Loading category...</p>
    <p v-else-if="errorMessage" class="text-red-600 mb-4">{{ errorMessage }}</p>

    <form v-else class="bg-white rounded-lg shadow-md p-8 space-y-6" @submit.prevent="submitForm">
      <CategoryFormFields v-model="form" />

      <div class="flex flex-wrap items-center gap-3 pt-4">
        <button
          type="submit"
          :disabled="saving"
          class="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 hover:shadow-orange-300 disabled:cursor-not-allowed disabled:bg-orange-300 disabled:shadow-none"
        >
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>

        <RouterLink
          :to="{ name: 'admin.categories' }"
          class="inline-flex items-center gap-2 rounded-full bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-300 hover:shadow"
        >
          Cancel
        </RouterLink>
      </div>

      <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
    </form>
  </section>
</template>
