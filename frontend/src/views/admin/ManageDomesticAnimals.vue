<!-- Authors: Alejandra Suarez -->
<script setup lang="ts">
// External imports
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import AdminManagementTable from '@/components/AdminManagementTable.vue';
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import { DomesticAnimalService } from '@/services/DomesticAnimalService';

const router = useRouter();
const domesticAnimals = ref<DomesticAnimalInterface[]>([]);
const loading = ref(true);
const errorMessage = ref('');
const deletingId = ref<number | null>(null);
const actionMessage = ref('');

async function loadDomesticAnimals() {
  loading.value = true;
  errorMessage.value = '';
  actionMessage.value = '';

  try {
    domesticAnimals.value = await DomesticAnimalService.getAll();
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Could not load domestic animals right now.';
  } finally {
    loading.value = false;
  }
}

function goToCreateDomesticAnimal() {
  router.push({ name: 'admin.domesticAnimals.create' });
}

function goToEditDomesticAnimal(id: number) {
  router.push({ name: 'admin.domesticAnimals.edit', params: { id } });
}

async function deleteDomesticAnimal(id: number) {
  const confirmed = window.confirm('Are you sure you want to delete this domestic animal?');
  if (!confirmed) {
    return;
  }

  deletingId.value = id;
  errorMessage.value = '';

  try {
    await DomesticAnimalService.deleteDomesticAnimal(id);
    await loadDomesticAnimals();
    actionMessage.value = 'Domestic animal deleted successfully.';
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Could not delete the domestic animal right now.';
  } finally {
    deletingId.value = null;
  }
}

onMounted(() => {
  loadDomesticAnimals();
});
</script>

<template>
  <section class="mx-auto max-w-7xl space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Manage Domestic Animals</h2>
        <p class="mt-2 text-sm text-gray-500">Manage the full list of domestic animals.</p>
      </div>

      <button
        type="button"
        class="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
        @click="goToCreateDomesticAnimal"
      >
        + Add Domestic Animal
      </button>
    </div>

    <p v-if="loading" class="text-sm text-gray-500">Loading domestic animals...</p>
    <p v-else-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

    <template v-else>
      <p v-if="actionMessage" class="text-sm text-green-600">{{ actionMessage }}</p>

      <AdminManagementTable
        title="All Pets"
        :columns="[
          { key: 'id', label: 'ID' },
          { key: 'breed', label: 'Breed' },
          { key: 'category', label: 'Category' },
        ]"
        :rows="domesticAnimals"
        row-key="id"
        :show-edit="true"
        :show-delete="true"
        :deleting-id="deletingId"
        @edit="goToEditDomesticAnimal"
        @delete="deleteDomesticAnimal"
      />
    </template>
  </section>
</template>