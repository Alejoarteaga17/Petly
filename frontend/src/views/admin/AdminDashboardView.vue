<!-- Authors: Alejandro Arteaga & Alejandra Suarez -->
<script setup lang="ts">
// External imports
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import AdminStatsTable from '@/components/AdminStatsTable.vue';
import CategoryChart from '@/components/CategoryChart.vue';
import CountryOriginMap from '@/components/CountryOriginMap.vue';
import PopularityChart from '@/components/PopularityChart.vue';
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import { ReviewService } from '@/services/ReviewService';
import { summarizeCountryOrigins } from '@/utils/CountrySummaryUtil.ts';
import { computePopularityByBreed } from '@/utils/PopularityUtil.ts';

const domesticAnimals = ref<DomesticAnimalInterface[]>([]);
const reviews = ref<ReviewInterface[]>([]);
const loading = ref(true);
const errorMessage = ref('');
const deletingId = ref<number | null>(null);
const actionMessage = ref('');
const router = useRouter();

const totalDomesticAnimals = computed(() => domesticAnimals.value.length);
const totalReviews = computed(() => reviews.value.length);

const categoryRows = computed(() => {
  const categoryMap = new Map<string, number>();

  for (const animal of domesticAnimals.value) {
    const category = animal.category?.species || 'Unknown';
    categoryMap.set(category, (categoryMap.get(category) ?? 0) + 1);
  }

  return Array.from(categoryMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
});

const popularityRows = computed(() => computePopularityByBreed(domesticAnimals.value, reviews.value));

const countryOriginRows = computed(() => {
  return summarizeCountryOrigins(domesticAnimals.value.map((animal) => animal.countryOrigin));
});

const topCountryOriginRows = computed(() => countryOriginRows.value.slice(0, 8));

async function loadDashboardData() {
  loading.value = true;
  errorMessage.value = '';
  actionMessage.value = '';

  try {
    const [animalsData, reviewsData] = await Promise.all([
      DomesticAnimalService.getAll(),
      ReviewService.getReviews(),
    ]);

    domesticAnimals.value = animalsData;
    reviews.value = reviewsData;
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Could not load dashboard data right now.';
  } finally {
    loading.value = false;
  }
}

function goToManageDomesticAnimals() {
  router.push({ name: 'admin.manageDomesticAnimals' });
}

function goToManageCategories() {
  router.push({ name: 'admin.categories' });
}

function goToManageUsers() {
  router.push({ name: 'admin.manageUsers' });
}

onMounted(() => {
  loadDashboardData();
});
</script>

<template>
  <section class="mx-auto max-w-7xl space-y-8">
    <div>
      <h2 class="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      <p class="mt-2 text-sm text-gray-500">General stats about pet distribution and popularity.</p>
    </div>

    <p v-if="loading" class="text-sm text-gray-500">Loading dashboard...</p>
    <p v-else-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

    <template v-else>
      <p v-if="actionMessage" class="text-sm text-green-600">{{ actionMessage }}</p>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p class="text-sm text-gray-500">Total pets</p>
          <p class="mt-2 text-3xl font-bold text-gray-800">{{ totalDomesticAnimals }}</p>
        </div>

        <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p class="text-sm text-gray-500">Total reviews</p>
          <p class="mt-2 text-3xl font-bold text-gray-800">{{ totalReviews }}</p>
        </div>

        <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p class="text-sm text-gray-500">Total categories</p>
          <p class="mt-2 text-3xl font-bold text-gray-800">{{ categoryRows.length }}</p>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <CategoryChart :data="categoryRows" />

        <PopularityChart :data="popularityRows" />
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <CountryOriginMap :data="countryOriginRows" title="Animals by country of origin" />

        <AdminStatsTable
          title="Top 8 countries by origin"
          :columns="[
            { key: 'label', label: 'Country' },
            { key: 'count', label: 'Count' },
          ]"
          :rows="topCountryOriginRows"
        />
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <AdminStatsTable
          title="Domestic Animals by category"
          :columns="[
            { key: 'category', label: 'Category' },
            { key: 'count', label: 'Count' },
          ]"
          :rows="categoryRows"
        />

        <AdminStatsTable
          title="Popularity by species"
          :columns="[
            { key: 'breed', label: 'Species / Breed' },
            { key: 'reviewsCount', label: 'Reviews' },
          ]"
          :rows="popularityRows"
        />
      </div>

      <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          class="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          @click="goToManageCategories"
        >
          Manage categories
        </button>
        
        <button
          type="button"
          class="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          @click="goToManageDomesticAnimals"
          >
          Manage domestic animals
        </button>

        <button
          type="button"
          class="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          @click="goToManageUsers"
        >
          Manage users
        </button>
      </div>
    </template>
  </section>
</template>
