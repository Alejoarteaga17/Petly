<script setup lang="ts">
import { articles } from '~/data/articles'
</script>

<template>
  <div>
    <header class="mb-4">
      <h1 class="h2">Blog</h1>
      <p class="text-body-secondary">Latest articles on the care and handling of domestic animals.</p>
    </header>

    <div class="list-group">
      <NuxtLink v-for="article in articles" :key="article.id" :to="`/blog/${article.id}`" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ article.title }}</h5>
          <small class="text-body-secondary">{{ article.date }}</small>
        </div>
        <p class="mb-1">{{ article.excerpt }}</p>
        <small class="text-body-secondary">By {{ article.author }}</small>
      </NuxtLink>
    </div>
  </div>
</template>
