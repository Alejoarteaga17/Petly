<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';
import { useRouter } from 'vue-router';
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { DomesticAnimalService } from '@/services/DomesticAnimalService';
import { ReviewService } from '@/services/ReviewService';
import AdminStatsTable from '@/components/AdminStatsTable.vue';
import AdminDomesticAnimalsTable from '@/components/AdminDomesticAnimalsTable.vue';

const domesticAnimals = ref<DomesticAnimalInterface[]>([]);
const reviews = ref<ReviewInterface[]>([]);
const loading = ref(true);
const errorMessage = ref('');
const deletingId = ref<number | null>(null);
const actionMessage = ref('');
const router = useRouter();

const categoryChartCanvas = ref<HTMLCanvasElement | null>(null);
const popularityChartCanvas = ref<HTMLCanvasElement | null>(null);
let categoryChart: Chart | null = null;
let popularityChart: Chart | null = null;

const totalDomesticAnimals = computed(() => domesticAnimals.value.length);
const totalReviews = computed(() => reviews.value.length);

const categoryRows = computed(() => {
  const categoryMap = new Map<string, number>();

  for (const animal of domesticAnimals.value) {
    const category = animal.category || 'Unknown';
    categoryMap.set(category, (categoryMap.get(category) ?? 0) + 1);
  }

  return Array.from(categoryMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
});

const popularityRows = computed(() => {
  const animalById = new Map<number, DomesticAnimalInterface>();
  for (const animal of domesticAnimals.value) {
    animalById.set(animal.id, animal);
  }

  const popularityMap = new Map<string, number>();
  for (const review of reviews.value) {
    const animal = animalById.get(review.domesticAnimalId);
    const breed = animal?.breed || `Animal #${review.domesticAnimalId}`;
    popularityMap.set(breed, (popularityMap.get(breed) ?? 0) + 1);
  }

  return Array.from(popularityMap.entries())
    .map(([breed, reviewsCount]) => ({ breed, reviewsCount }))
    .sort((a, b) => b.reviewsCount - a.reviewsCount);
});

function destroyCharts() {
  if (categoryChart) {
    categoryChart.destroy();
    categoryChart = null;
  }

  if (popularityChart) {
    popularityChart.destroy();
    popularityChart = null;
  }
}

function renderCharts() {
  destroyCharts();

  if (categoryChartCanvas.value) {
    categoryChart = new Chart(categoryChartCanvas.value, {
      type: 'bar',
      data: {
        labels: categoryRows.value.map((row) => row.category),
        datasets: [
          {
            label: 'Pets by category',
            data: categoryRows.value.map((row) => row.count),
            backgroundColor: '#fb923c',
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  if (popularityChartCanvas.value) {
    popularityChart = new Chart(popularityChartCanvas.value, {
      type: 'doughnut',
      data: {
        labels: popularityRows.value.map((row) => row.breed),
        datasets: [
          {
            label: 'Popularity by species',
            data: popularityRows.value.map((row) => row.reviewsCount),
            backgroundColor: ['#fb923c', '#f97316', '#ea580c', '#fdba74', '#f59e0b', '#fbbf24'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}

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

    await nextTick();
    renderCharts();
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Could not load dashboard data right now.';
  } finally {
    loading.value = false;
  }
}

function editDomesticAnimal(id: number) {
  router.push(`/domesticAnimals/${id}/edit`);
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
    actionMessage.value = 'Domestic animal deleted successfully.';
    await loadDashboardData();
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Could not delete the domestic animal right now.';
  } finally {
    deletingId.value = null;
  }
}

onMounted(() => {
  loadDashboardData();
});

onBeforeUnmount(() => {
  destroyCharts();
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
        <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 class="mb-3 text-lg font-semibold text-gray-800">General count by category</h3>
          <div class="relative h-72">
            <canvas ref="categoryChartCanvas" />
          </div>
        </div>

        <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 class="mb-3 text-lg font-semibold text-gray-800">Popularity by species</h3>
          <div class="relative h-72">
            <canvas ref="popularityChartCanvas" />
          </div>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <AdminStatsTable
          title="Pets by category"
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

      <AdminDomesticAnimalsTable
        :rows="domesticAnimals"
        :deleting-id="deletingId"
        @edit="editDomesticAnimal"
        @delete="deleteDomesticAnimal"
      />
    </template>
  </section>
</template>
