<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <div class="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      <header class="flex flex-col gap-4 border-b border-gray-200 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-4">
          <RouterLink to="/" class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm">
              <i class="fas fa-paw"></i>
            </div>
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Petly</p>
              <p class="text-lg font-black text-gray-900">Pet reviews dashboard</p>
            </div>
          </RouterLink>
        </div>

        <nav class="flex items-center gap-2 text-sm font-medium text-gray-600">
          <RouterLink to="/" class="rounded-full px-4 py-2 transition hover:bg-gray-200 hover:text-gray-900">
            Home
          </RouterLink>
          <RouterLink to="/about" class="rounded-full px-4 py-2 transition hover:bg-gray-200 hover:text-gray-900">
            About
          </RouterLink>
          <RouterLink to="/books" class="rounded-full px-4 py-2 transition hover:bg-gray-200 hover:text-gray-900">
            Books
          </RouterLink>
          <RouterLink to="/books/create" class="rounded-full px-4 py-2 transition hover:bg-gray-200 hover:text-gray-900">
            New Book
          </RouterLink>
        </nav>
      </header>

      <main class="flex-1 py-8">
        <RouterView />
      </main>

      <footer class="border-t border-gray-200 py-10">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div class="md:col-span-2">
            <h2 class="mb-4 text-2xl font-black">PETLY.CO</h2>

            <p class="max-w-sm text-sm text-gray-500">
              Find what other people think about your domesticAnimals and say something about them too.
            </p>

            <div class="mt-6 flex gap-4 text-sm text-gray-400">
              <span class="cursor-pointer hover:text-black">𝕏</span>
              <span class="cursor-pointer hover:text-black">Facebook</span>
              <span class="cursor-pointer hover:text-black">Instagram</span>
              <span class="cursor-pointer hover:text-black">GitHub</span>
            </div>
          </div>

          <div>
            <h3 class="mb-4 font-semibold">Company</h3>

            <ul class="space-y-2 text-sm text-gray-500">
              <li class="cursor-pointer hover:text-black">About</li>
              <li class="cursor-pointer hover:text-black">Features</li>
              <li class="cursor-pointer hover:text-black">Works</li>
              <li class="cursor-pointer hover:text-black">Career</li>
            </ul>
          </div>

          <div>
            <h3 class="mb-4 font-semibold">Help</h3>

            <ul class="space-y-2 text-sm text-gray-500">
              <li class="cursor-pointer hover:text-black">Customer Support</li>
              <li class="cursor-pointer hover:text-black">My Account</li>
              <li class="cursor-pointer hover:text-black">Terms & Conditions</li>
              <li class="cursor-pointer hover:text-black">Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div class="mt-10 border-t pt-6 text-xs text-gray-400">Petly 2024. All Rights Reserved</div>
      </footer>
    </div>
  </div>
</template>
