<!-- Authors: Alejandro Arteaga -->
<script setup lang="ts">
// External imports
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import type { Map as LeafletMap } from 'leaflet';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

// Internal imports
import { COUNTRY_COORDINATES, type Country } from '@/types/CountryTypes';

export interface CountryOriginMapData {
  country: Country;
  label: string;
  count: number;
}

interface Props {
  data: CountryOriginMapData[];
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Animals by country of origin',
});

const mapContainer = ref<HTMLDivElement | null>(null);
const isMapLoading = ref(true);

let mapInstance: LeafletMap | null = null;
let markersLayer: L.LayerGroup | null = null;

function getMapDataBounds(): L.LatLngBounds | null {
  const bounds = L.latLngBounds([]);
  let hasPoints = false;

  for (const row of props.data) {
    const coordinates = COUNTRY_COORDINATES[row.country];
    if (!coordinates) continue;

    bounds.extend([coordinates.lat, coordinates.lng]);
    hasPoints = true;
  }

  return hasPoints ? bounds : null;
}

function renderMarkers() {
  if (!mapInstance) return;

  markersLayer?.clearLayers();

  for (const row of props.data) {
    const coordinates = COUNTRY_COORDINATES[row.country];
    if (!coordinates) continue;

    const radius = Math.max(8, Math.min(28, 8 + row.count * 2));
    const marker = L.circleMarker([coordinates.lat, coordinates.lng], {
      radius,
      color: '#ea580c',
      weight: 2,
      fillColor: '#f97316',
      fillOpacity: 0.75,
    });

    const popupContent = `
      <div style="min-width: 160px;">
        <div style="font-weight: 700; color: #111827; margin-bottom: 4px;">${row.label}</div>
        <div style="color: #374151; font-size: 13px;">${row.count} animal${row.count === 1 ? '' : 's'}</div>
      </div>
    `;

    marker.bindPopup(popupContent);
    marker.bindTooltip(`${row.label}: ${row.count}`, {
      direction: 'top',
      offset: [0, -4],
      opacity: 0.95,
      sticky: true,
    });
    marker.addTo(markersLayer!);
  }

  const bounds = getMapDataBounds();
  if (bounds && bounds.isValid()) {
    mapInstance.fitBounds(bounds.pad(0.25));
  }
}

function initMap() {
  if (!mapContainer.value || mapInstance) return;

  mapInstance = L.map(mapContainer.value, {
    center: [20, 10],
    zoom: 2,
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: true,
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(mapInstance);

  markersLayer = L.layerGroup().addTo(mapInstance);
  L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);

  renderMarkers();
  isMapLoading.value = false;
}

function refreshMap() {
  if (!mapInstance) return;
  renderMarkers();
}

watch(
  () => props.data,
  () => {
    refreshMap();
  },
  { deep: true },
);

onMounted(async () => {
  await nextTick();
  initMap();
});

onBeforeUnmount(() => {
  markersLayer?.clearLayers();
  markersLayer = null;

  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
});
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <div class="mb-3 flex items-center justify-between gap-3">
      <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
      <span class="text-xs font-medium uppercase tracking-wide text-gray-500">Leaflet map</span>
    </div>

    <div class="relative h-80 w-full overflow-hidden rounded-lg">
      <div ref="mapContainer" class="h-full w-full"></div>
      <div
        v-if="isMapLoading"
        class="absolute inset-0 flex items-center justify-center bg-gray-50/90 text-sm text-gray-500"
      >
        Loading map...
      </div>
      <div
        v-else-if="data.length === 0"
        class="absolute inset-0 flex items-center justify-center bg-white/80 text-sm text-gray-500"
      >
        No country origin data available yet.
      </div>
    </div>
  </div>
</template>