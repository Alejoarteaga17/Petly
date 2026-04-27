<!-- Authors: Alejandro Arteaga & Alejandra Suarez -->
<script setup lang="ts">
interface ColumnDefinition {
  key: string;
  label: string;
}

defineProps<{
  title: string;
  columns: ColumnDefinition[];
  rows: Array<Record<string, string | number | boolean | null | undefined>>;
  rowKey?: string;
  showEdit?: boolean;
  showDelete?: boolean;
  deletingId?: number | null;
  emptyMessage?: string;
}>();

const emit = defineEmits<{
  (event: 'edit', id: number): void;
  (event: 'delete', id: number): void;
}>();
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <h3 class="mb-3 text-lg font-semibold text-gray-800">{{ title }}</h3>

    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse text-left text-sm">
        <thead>
          <tr class="border-b border-gray-200 bg-gray-50">
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-3 py-2 font-semibold text-gray-600"
            >
              {{ column.label }}
            </th>
            <th v-if="showEdit || showDelete" class="px-3 py-2 font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="String(row[rowKey ?? 'id'] ?? index)" class="border-b border-gray-100">
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-3 py-2 text-gray-700"
            >
              {{ row[column.key] }}
            </td>
            <td v-if="showEdit || showDelete" class="px-3 py-2">
              <div class="flex items-center gap-2">
                <button
                  v-if="showEdit"
                  type="button"
                  class="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-blue-700"
                  @click="emit('edit', Number(row[rowKey ?? 'id']))"
                >
                  Edit
                </button>
                <button
                  v-if="showDelete"
                  type="button"
                  :disabled="deletingId === Number(row[rowKey ?? 'id'])"
                  class="rounded bg-red-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300"
                  @click="emit('delete', Number(row[rowKey ?? 'id']))"
                >
                  {{ deletingId === Number(row[rowKey ?? 'id']) ? 'Deleting...' : 'Delete' }}
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="rows.length === 0">
            <td :colspan="columns.length + (showEdit || showDelete ? 1 : 0)" class="px-3 py-4 text-center text-gray-500">
              {{ emptyMessage || 'No data available.' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>