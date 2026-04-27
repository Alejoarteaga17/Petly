<!-- Authors: Alejandra Suarez -->
<script setup lang="ts">
// External imports
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import AdminManagementTable from '@/components/AdminManagementTable.vue';
import type { UserInterface } from '@/interfaces/UserInterface';
import { UserService } from '@/services/UserService';

const router = useRouter();
const users = ref<UserInterface[]>([]);
const loading = ref(true);
const errorMessage = ref('');
const actionMessage = ref('');

const totalUsers = computed(() => users.value.length);

async function loadUsers() {
  loading.value = true;
  errorMessage.value = '';
  actionMessage.value = '';

  try {
    users.value = await UserService.getAll();
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Could not load users right now.';
  } finally {
    loading.value = false;
  }
}

function goToEditUser(id: number) {
  router.push({ name: 'admin.users.edit', params: { id } });
}

function goToCreateUser() {
  router.push({ name: 'admin.users.create' });
}

function goToAdminDashboard() {
  router.push({ name: 'admin.dashboard' });
}

onMounted(() => {
  loadUsers();
});
</script>

<template>
  <section class="mx-auto max-w-7xl space-y-6">
    <div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        @click="goToAdminDashboard"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Back to dashboard</span>
      </button>
    </div>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Manage Users</h2>
        <p class="mt-2 text-sm text-gray-500">Manage the full list of registered users.</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
          Total users: <span class="font-semibold text-gray-900">{{ totalUsers }}</span>
        </div>
        <button
          type="button"
          class="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          @click="goToCreateUser"
        >
          + Add User
        </button>
      </div>
    </div>

    <p v-if="loading" class="text-sm text-gray-500">Loading users...</p>
    <p v-else-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

    <template v-else>
      <p v-if="actionMessage" class="text-sm text-green-600">{{ actionMessage }}</p>

      <AdminManagementTable
        title="All Users"
        :columns="[
          { key: 'id', label: 'ID' },
          { key: 'fullName', label: 'Full Name' },
          { key: 'username', label: 'Username' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
        ]"
        :rows="users"
        row-key="id"
        :show-edit="true"
        :show-delete="false"
        empty-message="No users available."
        @edit="goToEditUser"
      />
    </template>
  </section>
</template>