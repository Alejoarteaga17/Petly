<script setup lang="ts">
const { data } = await useFetch('/api/domesticAnimals')

const domesticAnimals = data?.value?.domesticAnimals || [];
</script>

<template>
  <div>
    <h1 class="h2 mb-3">Domestic Animals</h1>
    <ul class="list-group">
      <li
        v-for="domesticAnimal in domesticAnimals"
        :key="domesticAnimal.id"
        class="list-group-item position-relative"
      >
        <NuxtLink
          class="stretched-link text-decoration-none fw-medium"
          :to="`/domesticAnimals/${domesticAnimal.id}`"
        >
          {{ domesticAnimal.breed }}
        </NuxtLink>
        <span class="text-body-secondary d-block small">
          {{ domesticAnimal.countryOrigin }} · {{ domesticAnimal.lifeExpectancy }}
        </span>
      </li>
    </ul>
  </div>
</template>