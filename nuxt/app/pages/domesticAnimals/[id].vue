<script setup lang="ts">
import type { DomesticAnimal } from '~/interfaces/DomesticAnimal'

const { data: response } = await useFetch('/api/domesticAnimals')
const domesticAnimals = (response.value?.domesticAnimals ?? response.value ?? []) as DomesticAnimal[]

const route = useRoute()
const id = String(route.params.id)
const domesticAnimal = domesticAnimals.find((d: DomesticAnimal) => d.id === id) as DomesticAnimal | undefined

if (!domesticAnimal) {
  throw createError({ statusCode: 404, statusMessage: 'Domestic animal not found', fatal: true })
}
</script>

<template>
  <article v-if="domesticAnimal">
    <p class="mb-1">
      <NuxtLink class="text-decoration-none small" to="/domesticAnimals">← All domestic animals</NuxtLink>
    </p>

    <h1 class="h2 mb-1">{{ domesticAnimal.breed }}</h1>
    <p class="text-body-secondary mb-4">{{ domesticAnimal.countryOrigin }} · {{ domesticAnimal.lifeExpectancy }}</p>

    <img
      :src="domesticAnimal.image"
      :alt="domesticAnimal.breed"
      class="img-fluid rounded mb-4"
      style="max-height: 320px; object-fit: cover; width: 100%;"
    />

    <p class="lead mb-4">{{ domesticAnimal.description }}</p>

    <div class="row g-3">
      <div class="col-6 col-md-3">
        <div class="border rounded p-3 text-center">
          <div class="small text-body-secondary mb-1">Weight</div>
          <div class="fw-semibold">{{ domesticAnimal.weight }}</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="border rounded p-3 text-center">
          <div class="small text-body-secondary mb-1">Height</div>
          <div class="fw-semibold">{{ domesticAnimal.height }}</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="border rounded p-3 text-center">
          <div class="small text-body-secondary mb-1">Life Expectancy</div>
          <div class="fw-semibold">{{ domesticAnimal.lifeExpectancy }}</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="border rounded p-3 text-center">
          <div class="small text-body-secondary mb-1">Origin</div>
          <div class="fw-semibold">{{ domesticAnimal.countryOrigin }}</div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <h2 class="h5">Behaviours</h2>
      <p class="text-body-secondary">{{ domesticAnimal.behaviours }}</p>
    </div>

    <div class="mt-3">
      <h2 class="h5">Common Diseases</h2>
      <p class="text-body-secondary">{{ domesticAnimal.commonDisease }}</p>
    </div>

    <div class="mt-3">
      <h2 class="h5">History</h2>
      <p class="text-body-secondary">{{ domesticAnimal.history }}</p>
    </div>
  </article>
</template>