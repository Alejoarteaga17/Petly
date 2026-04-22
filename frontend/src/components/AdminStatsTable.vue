<script setup lang="ts">
// Author: Alejandro Arteaga
interface ColumnDefinition {
  key: string;
  label: string;
}

defineProps<{
  title: string;
  columns: ColumnDefinition[];
  rows: Array<Record<string, string | number>>;
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index" class="border-b border-gray-100">
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-3 py-2 text-gray-700"
            >
              {{ row[column.key] }}
            </td>
          </tr>
          <tr v-if="rows.length === 0">
            <td :colspan="columns.length" class="px-3 py-4 text-center text-gray-500">
              No data available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
