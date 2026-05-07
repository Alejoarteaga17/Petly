<script setup lang="ts">
import { domesticAnimals } from '~/data/domesticAnimals'

definePageMeta({
  validate(route) {
    const param = String(route.params.id)
    return domesticAnimals.some((a) => a.id === param)
  },
})

const route = useRoute()
const id = computed(() => String(route.params.id))
const animal = computed(() => domesticAnimals.find((a) => a.id === id.value))
</script>

<template>
  <article v-if="animal">
    <p class="mb-1">
      <NuxtLink class="text-decoration-none small" to="/domesticAnimals">← All animals</NuxtLink>
    </p>

    <h1 class="h2 mb-1">{{ animal.breed }}</h1>
    <p class="text-body-secondary mb-4">{{ animal.countryOrigin }} · {{ animal.lifeExpectancy }}</p>

    <img
      :src="animal.image"
      :alt="animal.breed"
      class="img-fluid rounded mb-4"
      style="max-height: 320px; object-fit: cover; width: 100%;"
    />

    <p class="lead mb-4">{{ animal.description }}</p>

    <div class="row g-3">
      <div class="col-6 col-md-3">
        <div class="border rounded p-3 text-center">
          <div class="small text-body-secondary mb-1">Weight</div>
          <div class="fw-semibold">{{ animal.weight }}</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="border rounded p-3 text-center">
          <div class="small text-body-secondary mb-1">Height</div>
          <div class="fw-semibold">{{ animal.height }}</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="border rounded p-3 text-center">
          <div class="small text-body-secondary mb-1">Life Expectancy</div>
          <div class="fw-semibold">{{ animal.lifeExpectancy }}</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="border rounded p-3 text-center">
          <div class="small text-body-secondary mb-1">Origin</div>
          <div class="fw-semibold">{{ animal.countryOrigin }}</div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <h2 class="h5">Behaviours</h2>
      <p class="text-body-secondary">{{ animal.behaviours }}</p>
    </div>

    <div class="mt-3">
      <h2 class="h5">Common Diseases</h2>
      <p class="text-body-secondary">{{ animal.commonDisease }}</p>
    </div>

    <div class="mt-3">
      <h2 class="h5">History</h2>
      <p class="text-body-secondary">{{ animal.history }}</p>
    </div>
  </article>
</template>