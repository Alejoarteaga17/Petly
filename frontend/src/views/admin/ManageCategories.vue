<!-- Author: Alejandro Arteaga -->
<script setup lang="ts">
// External imports
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import AdminManagementTable from '@/components/AdminManagementTable.vue';
import type { CategoryInterface } from '@/interfaces/CategoryInterface';
import { CategoryService } from '@/services/CategoryService';

const router = useRouter();
const categories = ref<CategoryInterface[]>([]);
const loading = ref(true);
const errorMessage = ref('');
const deletingId = ref<number | null>(null);
const actionMessage = ref('');

async function loadCategories() {
  loading.value = true;
  errorMessage.value = '';
  actionMessage.value = '';

  try {
    categories.value = await CategoryService.getAll();
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Could not load categories right now.';
  } finally {
    loading.value = false;
  }
}

function goToCreateCategory() {
  router.push({ name: 'admin.categories.create' });
}

function goToEditCategory(id: number) {
  router.push({ name: 'admin.categories.edit', params: { id } });
}

function goToAdminDashboard() {
  router.push({ name: 'admin.dashboard' });
}

async function deleteCategory(id: number) {
  const confirmed = window.confirm('Are you sure you want to delete this category?');
  if (!confirmed) {
    return;
  }

  deletingId.value = id;
  errorMessage.value = '';

  try {
    await CategoryService.deleteCategory(id);
    await loadCategories();
    actionMessage.value = 'Category deleted successfully.';
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Could not delete the category right now.';
  } finally {
    deletingId.value = null;
  }
}

onMounted(() => {
  loadCategories();
});
</script>

<template>
  <section class="mx-auto max-w-7xl space-y-6">
    <div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        @click="goToAdminDashboard"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Back to dashboard</span>
      </button>
    </div>

    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Manage Categories</h2>
        <p class="mt-2 text-sm text-gray-500">Manage the full list of animal categories.</p>
      </div>

      <button
        type="button"
        class="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
        @click="goToCreateCategory"
      >
        + Add Category
      </button>
    </div>

    <p v-if="loading" class="text-sm text-gray-500">Loading categories...</p>
    <p v-else-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

    <template v-else>
      <p v-if="actionMessage" class="text-sm text-green-600">{{ actionMessage }}</p>

      <AdminManagementTable
        title="All Categories"
        :columns="[
          { key: 'id', label: 'ID' },
          { key: 'species', label: 'Species' },
        ]"
        :rows="categories"
        row-key="id"
        :show-edit="true"
        :show-delete="true"
        :deleting-id="deletingId"
        @edit="goToEditCategory"
        @delete="deleteCategory"
      />
    </template>
  </section>
</template>
