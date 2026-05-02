<!-- Authors: Alejandra Suarez -->
<script setup lang="ts">
// External imports
import Chart from 'chart.js/auto';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

// Internal imports
import { buildChartColors } from '@/utils/ChartColors';

export interface PopularityData {
  breed: string;
  reviewsCount: number;
}

interface Props {
  data: PopularityData[];
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Popularity by species',
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

function destroyChart() {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
}

function renderChart() {
  destroyChart();

  if (!canvasRef.value || props.data.length === 0) return;

  const colors = buildChartColors(props.data.length, 0.85);

  chartInstance = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: {
      labels: props.data.map((row) => row.breed),
      datasets: [
        {
          label: props.title,
          data: props.data.map((row) => row.reviewsCount),
          backgroundColor: colors,
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

watch(
  () => props.data,
  () => {
    renderChart();
  },
  { deep: true },
);

onMounted(() => {
  renderChart();
});

onBeforeUnmount(() => {
  destroyChart();
});
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <h3 class="mb-3 text-lg font-semibold text-gray-800">{{ title }}</h3>
    <div class="relative h-72 w-full">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>
