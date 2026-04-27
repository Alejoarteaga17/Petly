<!-- Authors: Alejandra Suarez -->
<script setup lang="ts">
// External imports
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Internal imports
import UserFormFields from '@/components/UserFormFields.vue';
import type { UserRole } from '@/interfaces/UserInterface';
import { UserService } from '@/services/UserService';

type UserEditForm = {
  fullName: string;
  username: string;
  email: string;
  role: UserRole;
};

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const saving = ref(false);
const errorMessage = ref('');

const form = ref<UserEditForm>({
  fullName: '',
  username: '',
  email: '',
  role: 'user',
});

async function loadUser() {
  loading.value = true;
  errorMessage.value = '';

  try {
    const userId = Number(route.params.id);
    const user = await UserService.getById(userId);

    form.value = {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Could not load user details.';
  } finally {
    loading.value = false;
  }
}

async function submitForm() {
  saving.value = true;
  errorMessage.value = '';

  try {
    const userId = Number(route.params.id);
    await UserService.updateUser(userId, {
      fullName: form.value.fullName.trim(),
      username: form.value.username.trim(),
      email: form.value.email.trim(),
      role: form.value.role,
    });

    await router.push({ name: 'admin.manageUsers' });
  } catch (error: any) {
    console.error(error);
    errorMessage.value = error?.response?.data?.message || 'Could not update the user right now.';
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  loadUser();
});
</script>

<template>
  <section class="mx-auto max-w-3xl space-y-6 py-8">
    <div>
      <h2 class="text-3xl font-bold text-gray-800">Edit User</h2>
      <p class="mt-2 text-sm text-gray-500">Update user basic information.</p>
    </div>

    <p v-if="loading" class="text-sm text-gray-500">Loading user...</p>

    <form v-else class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6" @submit.prevent="submitForm">
      <UserFormFields v-model="form" :include-role="true" />

      <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          :disabled="saving"
          class="rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
        >
          {{ saving ? 'Saving...' : 'Save changes' }}
        </button>
        <RouterLink
          :to="{ name: 'admin.manageUsers' }"
          class="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300"
        >
          &larr; Cancel
        </RouterLink>
      </div>
    </form>
  </section>
</template>