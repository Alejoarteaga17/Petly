<!-- Author: Alejandro Arteaga -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DomesticAnimalFormFields from '@/components/DomesticAnimalFormFields.vue';
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import type { CreateDomesticAnimalDTO } from '@/dtos/CreateDomesticAnimalDTO';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const saving = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const form = ref<CreateDomesticAnimalDTO>({
  breed: '',
  category: '',
  description: '',
  lifeExpectancy: '',
  weight: '',
  height: '',
  behaviours: '',
  commonDisease: '',
  countryOrigin: '',
  history: '',
  image: '',
});

async function loadDomesticAnimal() {
  loading.value = true;
  errorMessage.value = '';

  try {
    const domesticAnimalId = Number(route.params.id);
    const domesticAnimal = await DomesticAnimalService.getById(domesticAnimalId);

    form.value = {
      breed: domesticAnimal.breed,
      category: domesticAnimal.category,
      description: domesticAnimal.description,
      lifeExpectancy: domesticAnimal.lifeExpectancy,
      weight: domesticAnimal.weight,
      height: domesticAnimal.height,
      behaviours: domesticAnimal.behaviours,
      commonDisease: domesticAnimal.commonDisease,
      countryOrigin: domesticAnimal.countryOrigin,
      history: domesticAnimal.history,
      image: domesticAnimal.image,
    };
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Could not load the domestic animal details.';
  } finally {
    loading.value = false;
  }
}

async function submitForm() {
  saving.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const domesticAnimalId = Number(route.params.id);
    await DomesticAnimalService.updateDomesticAnimal(domesticAnimalId, form.value);
    successMessage.value = 'Domestic animal updated successfully!';
    await router.push({ name: 'admin.manageDomesticAnimals' });
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Error updating domestic animal. Please verify all fields.';
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  loadDomesticAnimal();
});
</script>

<template>
  <section class="max-w-2xl mx-auto py-8">
    <div class="mb-4">
      <RouterLink
        :to="{ name: 'admin.manageDomesticAnimals' }"
        class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Back to domestic animals</span>
      </RouterLink>
    </div>

    <h2 class="text-2xl font-bold text-gray-800 mb-8">Edit Domestic Animal</h2>

    <p v-if="loading" class="text-sm text-gray-500">Loading domestic animal...</p>
    <p v-else-if="errorMessage" class="text-red-600 mb-4">{{ errorMessage }}</p>

    <form v-else class="bg-white rounded-lg shadow-md p-8 space-y-6" @submit.prevent="submitForm">
      <DomesticAnimalFormFields v-model="form" />

      <div class="flex flex-wrap items-center gap-3 pt-4">
        <button
          type="submit"
          :disabled="saving"
          class="rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
        >
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>

        <RouterLink
          :to="{ name: 'admin.manageDomesticAnimals' }"
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
