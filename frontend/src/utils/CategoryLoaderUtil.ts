// Author: Alejandro Arteaga

// External imports
import { ref } from 'vue';
import type { Ref } from 'vue';

// Internal imports
import type { CategoryInterface } from '@/interfaces/CategoryInterface';
import { CategoryService } from '@/services/CategoryService';

interface UseCategoryLoaderOptions {
  fallbackErrorMessage?: string;
}

export function useCategoryLoader(options?: UseCategoryLoaderOptions): {
  categories: Ref<CategoryInterface[]>;
  loading: Ref<boolean>;
  errorMessage: Ref<string>;
  loadCategories: () => Promise<void>;
} {
  const categories = ref<CategoryInterface[]>([]);
  const loading = ref(false);
  const errorMessage = ref('');

  const fallbackErrorMessage =
    options?.fallbackErrorMessage ?? 'Could not load categories right now.';

  async function loadCategories() {
    loading.value = true;
    errorMessage.value = '';

    try {
      categories.value = await CategoryService.getAll();
    } catch (error) {
      console.error(error);
      errorMessage.value = fallbackErrorMessage;
    } finally {
      loading.value = false;
    }
  }

  return {
    categories,
    loading,
    errorMessage,
    loadCategories,
  };
}