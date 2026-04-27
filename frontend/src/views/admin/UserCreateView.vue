<!-- Authors: Alejandra Suarez -->
<script setup lang="ts">
// External imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import UserFormFields from '@/components/UserFormFields.vue';
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';
import { UserService } from '@/services/UserService';

const router = useRouter();
const saving = ref(false);
const errorMessage = ref('');

const form = ref<CreateUserDTO>({
  fullName: '',
  username: '',
  email: '',
  password: '',
  role: 'user',
});

async function submitForm() {
  saving.value = true;
  errorMessage.value = '';

  try {
    await UserService.registerUser({
      fullName: form.value.fullName.trim(),
      username: form.value.username.trim(),
      email: form.value.email.trim(),
      password: form.value.password,
      role: 'user',
    });

    await router.push({ name: 'admin.manageUsers' });
  } catch (error: any) {
    console.error(error);
    errorMessage.value = error?.response?.data?.message || 'Could not create user right now.';
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <section class="mx-auto max-w-3xl space-y-6 py-8">
    <div>
      <h2 class="text-3xl font-bold text-gray-800">Create User</h2>
      <p class="mt-2 text-sm text-gray-500">Create a new user account for the platform.</p>
    </div>

    <form class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6" @submit.prevent="submitForm">
      <UserFormFields v-model="form" :include-password="true" />

      <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          :disabled="saving"
          class="rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
        >
          {{ saving ? 'Creating...' : 'Create user' }}
        </button>
        <RouterLink
          :to="{ name: 'admin.manageUsers' }"
          class="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300"
        >
          Cancel
        </RouterLink>
      </div>
    </form>
  </section>
</template>