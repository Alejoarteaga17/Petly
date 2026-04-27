<!-- Authors: Alejandro Arteaga & Alejandra Suarez -->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { UserInterface } from '@/interfaces/UserInterface';
import { UserService } from '@/services/UserService';
import AdminManagementTable from '@/components/AdminManagementTable.vue';

const users = ref<UserInterface[]>([]);
const loading = ref(true);
const errorMessage = ref('');
const savingId = ref<number | null>(null);
const actionMessage = ref('');
const selectedUser = ref<UserInterface | null>(null);
const editForm = ref({
  fullName: '',
  username: '',
  email: '',
});

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

function startEditing(user: UserInterface) {
  selectedUser.value = user;
  editForm.value = {
    fullName: user.fullName,
    username: user.username,
    email: user.email,
  };
  actionMessage.value = '';
  errorMessage.value = '';
}

function cancelEditing() {
  selectedUser.value = null;
  editForm.value = {
    fullName: '',
    username: '',
    email: '',
  };
}

function editUser(id: number) {
  const user = users.value.find((candidate) => candidate.id === id);
  if (!user) return;

  startEditing(user);
}

async function saveUser() {
  if (!selectedUser.value) return;

  savingId.value = selectedUser.value.id;
  errorMessage.value = '';

  try {
    await UserService.updateUser(selectedUser.value.id, {
      fullName: editForm.value.fullName.trim(),
      username: editForm.value.username.trim(),
      email: editForm.value.email.trim(),
    });

    selectedUser.value = null;
    await loadUsers();
    actionMessage.value = 'User updated successfully.';
  } catch (error: any) {
    console.error(error);
    errorMessage.value = error?.response?.data?.message || 'Could not update the user right now.';
  } finally {
    savingId.value = null;
  }
}

onMounted(() => {
  loadUsers();
});
</script>

<template>
  <section class="mx-auto max-w-7xl space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Manage Users</h2>
        <p class="mt-2 text-sm text-gray-500">Review and edit registered users.</p>
      </div>

      <div class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
        Total users: <span class="font-semibold text-gray-900">{{ totalUsers }}</span>
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
        @edit="editUser"
      />

      <form
        v-if="selectedUser"
        class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4"
        @submit.prevent="saveUser"
      >
        <div>
          <h3 class="text-lg font-semibold text-gray-800">Edit User #{{ selectedUser.id }}</h3>
          <p class="text-sm text-gray-500">Role cannot be changed from this form.</p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div>
            <label class="mb-1 block text-sm font-semibold text-gray-600" for="fullName">Full Name</label>
            <input
              id="fullName"
              v-model="editForm.fullName"
              type="text"
              class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-300 focus:outline-none focus:ring"
              required
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-gray-600" for="username">Username</label>
            <input
              id="username"
              v-model="editForm.username"
              type="text"
              class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-300 focus:outline-none focus:ring"
              required
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-gray-600" for="email">Email</label>
            <input
              id="email"
              v-model="editForm.email"
              type="email"
              class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-300 focus:outline-none focus:ring"
              required
            />
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            :disabled="savingId === selectedUser.id"
            class="rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
          >
            {{ savingId === selectedUser.id ? 'Saving...' : 'Save changes' }}
          </button>
          <button
            type="button"
            class="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300"
            @click="cancelEditing"
          >
            Cancel
          </button>
        </div>
      </form>
    </template>
  </section>
</template>