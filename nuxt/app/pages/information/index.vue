<script setup lang="ts"></script>

<template>
  <div>
    <h1 class="h2 mb-1">Information</h1>
    <p class="text-body-secondary mb-4">Learn more about Petly and find answers to common questions.</p>

    <div class="list-group">
      <NuxtLink
        to="/information/about"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3"
      >
        <div>
          <div class="fw-medium">About</div>
          <div class="small text-body-secondary">Who we are and what Petly is all about</div>
        </div>
        <span class="text-body-secondary">→</span>
      </NuxtLink>

      <NuxtLink
        to="/information/faq"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3"
      >
        <div>
          <div class="fw-medium">FAQ</div>
          <div class="small text-body-secondary">Frequently asked questions about domestic animals</div>
        </div>
        <span class="text-body-secondary">→</span>
      </NuxtLink>
    </div>
  </div>
</template>