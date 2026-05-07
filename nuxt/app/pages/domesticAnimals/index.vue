<script setup lang="ts">
import { domesticAnimals } from '~/data/domesticAnimals'
</script>

<template>
  <div>
    <h1 class="h2 mb-3">Domestic Animals</h1>
    <ul class="list-group">
      <li
        v-for="animal in domesticAnimals"
        :key="animal.id"
        class="list-group-item position-relative"
      >
        <NuxtLink
          class="stretched-link text-decoration-none fw-medium"
          :to="`/domesticAnimals/${animal.id}`"
        >
          {{ animal.breed }}
        </NuxtLink>
        <span class="text-body-secondary d-block small">
          {{ animal.countryOrigin }} · {{ animal.lifeExpectancy }}
        </span>
      </li>
    </ul>
  </div>
</template>