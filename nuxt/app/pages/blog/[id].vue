<script setup lang="ts">
import { articles } from '~/data/articles'

definePageMeta({
  validate(route) {
    const param = String(route.params.id)
    return articles.some((a) => a.id === param)
  },
})

const route = useRoute()
const id = String(route.params.id)
const article = articles.find((a) => a.id === id) as Blog | undefined

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}
</script>

<template>
  <div>
    <header class="mb-4">
      <NuxtLink to="/blog" class="btn btn-outline-primary d-inline-flex align-items-center mb-3">
        <span class="me-2">←</span>
        Back to blog
      </NuxtLink>
      <h1 class="h2">{{ article.title }}</h1>
      <p class="text-body-secondary mb-0">By {{ article.author }} · {{ article.date }}</p>
    </header>

    <img v-if="article.image" :src="article.image" :alt="article.title" class="img-fluid rounded mb-4" />

    <div class="mb-4">
      <p v-for="(line, idx) in article.content.split('\n')" :key="idx">{{ line }}</p>
    </div>
  </div>
</template>
