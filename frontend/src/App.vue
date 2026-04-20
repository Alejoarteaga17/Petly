<!-- Author: Alejandro Arteaga & Alejandra Suarez-->
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router';
import type { UserInterface } from '@/interfaces/UserInterface';

const route = useRoute();
const authUser = ref<UserInterface | null>(null);

function loadAuthUser() {
  const stored = localStorage.getItem('authUser');
  authUser.value = stored ? (JSON.parse(stored) as UserInterface) : null;
}

watch(
  () => route.fullPath,
  () => {
    loadAuthUser();
  },
  { immediate: true },
);
</script>

<template>
  <div class="min-h-screen bg-[#ffffff]">
    <!-- HEADER: fixed top bar -->
    <header class="fixed inset-x-0 top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div class="mx-auto max-w-7xl px-6">
        <div class="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <!-- Logo -->
          <div class="flex items-center gap-4">
            <RouterLink to="/" class="flex items-center gap-3">
              <img src="/favicon.ico" alt="Petly logo" class="h-12 w-12 rounded-xl object-cover" />
              <span class="text-lg font-black tracking-wide text-gray-900">PETLY.CO</span>
            </RouterLink>
          </div>

          <!-- Nav links -->
          <!-- Agregamos validacion de autenticacion para ocualtar botones-->
          <nav class="flex items-center gap-3">
            <RouterLink to="/" class="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">Home</RouterLink>
            <RouterLink to="/profile" class="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">Profile</RouterLink>
            <RouterLink to="/domesticAnimals" class="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">Domestic animals</RouterLink>
            <RouterLink v-if="!authUser" to="/login" class="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">Login</RouterLink>
            <RouterLink v-if="!authUser" to="/register" class="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">Register</RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- MAIN: route content area -->
    <main class="mx-auto max-w-7xl px-6 pb-14 pt-32">
      <RouterView />
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-gray-200 pb-10 pt-16">
      <div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-4">
        <div class="md:col-span-2">
          <h2 class="mb-4 text-2xl font-black">PETLY.CO</h2>

          <p class="max-w-sm text-sm text-gray-500">
            Find what other people think about your domesticAnimals and say something about them too.
          </p>
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

      <div class="mx-auto mt-10 max-w-7xl border-t px-6 pt-6 text-xs text-gray-400">Petly 2026. All Rights Reserved</div>
    </footer>
  </div>
</template>
