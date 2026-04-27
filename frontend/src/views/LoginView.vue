<!-- Author: Alejandro Arteaga -->
<script setup lang="ts">
// External imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
// Internal imports
import { UserService } from '@/services/UserService';
import { decodeJWT } from '@/utils/jwtUtils';
import type { UserInterface } from '@/interfaces/UserInterface';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// Reactive variables
const username = ref('');
const password = ref('');
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

async function submitLogin() {
  successMessage.value = '';
  errorMessage.value = '';
  loading.value = true;

  try {
    const { accessToken } = await UserService.loginUser({
      username: username.value,
      password: password.value,
    });

    // Decode JWT to extract user info
    const payload = decodeJWT(accessToken);
    if (!payload) {
      throw new Error('Invalid token received');
    }

    // Build user object from JWT payload
    const user: UserInterface = {
      id: payload.sub,
      fullName: payload.fullName,
      email: payload.email,
      username: payload.username,
      role: payload.role,
    };

    authStore.setSession(accessToken, user);
    successMessage.value = `Welcome back, ${user.fullName}!`;
    username.value = '';
    password.value = '';

    await router.push('/');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      errorMessage.value = 'Invalid username or password.';
    } else if (axios.isAxiosError(error) && error.response?.status === 400) {
      errorMessage.value = 'Please verify the login data and try again.';
    } else {
      errorMessage.value = 'Could not log in right now. Please try again.';
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="mx-auto max-w-md py-10">
    <h2 class="mb-8 text-3xl font-bold text-gray-800">Login</h2>

    <form class="space-y-6 rounded-lg bg-white p-8 shadow-md" @submit.prevent="submitLogin">
      <div>
        <label class="mb-2 block font-semibold text-gray-700" for="username">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          autocomplete="username"
          class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
          placeholder="Enter your username"
          required
        />
      </div>

      <div>
        <label class="mb-2 block font-semibold text-gray-700" for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full rounded bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
      >
        {{ loading ? 'Logging in...' : 'Log in' }}
      </button>

      <p v-if="successMessage" class="mt-2 text-green-600">{{ successMessage }}</p>
      <p v-if="errorMessage" class="mt-2 text-red-600">{{ errorMessage }}</p>
    </form>
  </section>
</template>
