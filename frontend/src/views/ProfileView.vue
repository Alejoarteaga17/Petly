<!-- Author: Alejandro Arteaga -->
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import type { UserInterface } from '@/interfaces/UserInterface';

const authUser = ref<UserInterface | null>(null);
const router = useRouter();

const profileFields = computed(() => {
  if (!authUser.value) return [];

  return [
    { label: 'ID', value: String(authUser.value.id) },
    { label: 'Full Name', value: authUser.value.fullName },
    { label: 'Username', value: authUser.value.username },
    { label: 'Email', value: authUser.value.email },
    { label: 'Role', value: authUser.value.role },
  ];
});

function loadAuthUser() {
  const stored = localStorage.getItem('authUser');
  authUser.value = stored ? (JSON.parse(stored) as UserInterface) : null;
}
async function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('authUser');
  authUser.value = null;
  await router.push('/');
}

onMounted(() => {
  loadAuthUser();
});


</script>

<template>
  <section class="mx-auto mt-4 mb-4 max-w-3xl">
    <div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <div class="mb-6 flex items-center justify-between gap-4">
        <h2 class="text-3xl font-bold text-gray-800">My Profile</h2>
        <button
          v-if="authUser"
          type="button"
          class="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          @click="logout"
        >
          Logout
        </button>
      </div>
      

      <div v-if="authUser" class="space-y-4">
        <div
          v-for="field in profileFields"
          :key="field.label"
          class="flex flex-col gap-1 rounded-lg border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span class="text-sm font-semibold text-gray-500">{{ field.label }}</span>
          <span class="text-base font-medium text-gray-800">{{ field.value }}</span>
        </div>

      </div>

      <div v-else class="rounded-lg border border-yellow-200 bg-yellow-50 p-5">
        <p class="mb-4 text-sm text-gray-700">
          You are not logged in. Log in or create an account to see your profile information.
        </p>
        <div class="flex gap-3">
          <RouterLink to="/login" class="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
            Log in
          </RouterLink>
          <RouterLink to="/register" class="rounded bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-600">
            Register
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
