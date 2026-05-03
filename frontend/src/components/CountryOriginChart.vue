<!-- Authors: Alejandro Arteaga -->
<script setup lang="ts">
// External imports
import Chart from 'chart.js/auto';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

// Internal imports
import { buildChartColors } from '@/utils/ChartColors';

export interface CountryOriginData {
  country: string;
  label: string;
  count: number;
}

interface Props {
  data: CountryOriginData[];
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Animals by country of origin',
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

  const backgroundColors = buildChartColors(props.data.length, 0.8);
  const borderColors = buildChartColors(props.data.length, 1);

  chartInstance = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels: props.data.map((row) => row.label),
      datasets: [
        {
          label: props.title,
          data: props.data.map((row) => row.count),
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            precision: 0,
          },
        },
      },
    },
  });
}

watch(() => props.data, () => {
  renderChart();
}, { deep: true });

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
    <div v-if="data.length === 0" class="flex h-72 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
      No country origin data available yet.
    </div>
    <div v-else class="relative h-72 w-full">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>