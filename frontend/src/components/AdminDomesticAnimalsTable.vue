<!-- Author: Alejandro Arteaga & Alejandra Suarez -->
<script setup lang="ts">
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';

defineProps<{
  rows: DomesticAnimalInterface[];
  deletingId?: number | null;
}>();

const emit = defineEmits<{
  (event: 'edit', id: number): void;
  (event: 'delete', id: number): void;
}>();
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <h3 class="mb-3 text-lg font-semibold text-gray-800">All Pets</h3>

    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse text-left text-sm">
        <thead>
          <tr class="border-b border-gray-200 bg-gray-50">
            <th class="px-3 py-2 font-semibold text-gray-600">ID</th>
            <th class="px-3 py-2 font-semibold text-gray-600">Breed</th>
            <th class="px-3 py-2 font-semibold text-gray-600">Category</th>
            <th class="px-3 py-2 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id" class="border-b border-gray-100">
            <td class="px-3 py-2 text-gray-700">{{ row.id }}</td>
            <td class="px-3 py-2 text-gray-700">{{ row.breed }}</td>
            <td class="px-3 py-2 text-gray-700">{{ row.category }}</td>
            <td class="px-3 py-2">
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-blue-700"
                  @click="emit('edit', row.id)"
                >
                  Edit
                </button>
                <button
                  type="button"
                  :disabled="deletingId === row.id"
                  class="rounded bg-red-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300"
                  @click="emit('delete', row.id)"
                >
                  {{ deletingId === row.id ? 'Deleting...' : 'Delete' }}
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="rows.length === 0">
            <td colspan="4" class="px-3 py-4 text-center text-gray-500">
              No pets available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
