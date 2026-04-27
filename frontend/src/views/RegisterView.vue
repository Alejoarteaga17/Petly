<!-- Author: Alejandro Arteaga -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { UserService } from '@/services/UserService';
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';

const router = useRouter();

// Reactive variables
const fullName = ref('');
const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

async function submitRegister() {
  successMessage.value = '';
  errorMessage.value = '';

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.';
    return;
  }

  loading.value = true;

  const newUser: CreateUserDTO = {
    fullName: fullName.value,
    email: email.value,
    username: username.value,
    password: password.value,
    role: 'user',
  };

  try {
    await UserService.registerUser(newUser);
    successMessage.value = 'Account created successfully. You can now log in.';

    fullName.value = '';
    email.value = '';
    username.value = '';
    password.value = '';
    confirmPassword.value = '';

    await router.push('/');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      errorMessage.value = 'A user with that email or username already exists.';
    } else if (axios.isAxiosError(error) && error.response?.status === 400) {
      errorMessage.value = 'Please verify your data and try again.';
    } else {
      errorMessage.value = 'Could not register right now. Please try again.';
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="mx-auto max-w-md py-10">
    <h2 class="mb-8 text-3xl font-bold text-gray-800">Register</h2>

    <form class="space-y-6 rounded-lg bg-white p-8 shadow-md" @submit.prevent="submitRegister">
      <div>
        <label class="mb-2 block font-semibold text-gray-700" for="fullName">Full Name</label>
        <input
          id="fullName"
          v-model="fullName"
          type="text"
          autocomplete="name"
          class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label class="mb-2 block font-semibold text-gray-700" for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label class="mb-2 block font-semibold text-gray-700" for="username">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          autocomplete="username"
          class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
          placeholder="Choose a username"
          required
        />
      </div>

      <div>
        <label class="mb-2 block font-semibold text-gray-700" for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          minlength="6"
          autocomplete="new-password"
          class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
          placeholder="Create a password"
          required
        />
      </div>

      <div>
        <label class="mb-2 block font-semibold text-gray-700" for="confirmPassword"
          >Confirm Password</label
        >
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          minlength="6"
          autocomplete="new-password"
          class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
          placeholder="Repeat your password"
          required
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full rounded bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
      >
        {{ loading ? 'Creating account...' : 'Create account' }}
      </button>

      <p v-if="successMessage" class="mt-2 text-green-600">{{ successMessage }}</p>
      <p v-if="errorMessage" class="mt-2 text-red-600">{{ errorMessage }}</p>
    </form>
  </section>
</template>
