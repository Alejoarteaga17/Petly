<!-- Authors: Alejandro Arteaga & Alejandra Suarez -->
<script setup lang="ts">
import type { UserRole } from '@/interfaces/UserInterface';

type UserFormModel = {
  fullName: string;
  username: string;
  email: string;
  role?: UserRole;
  password?: string;
};

withDefaults(
  defineProps<{
    includePassword?: boolean;
    includeRole?: boolean;
  }>(),
  {
    includePassword: false,
    includeRole: false,
  },
);

const model = defineModel<UserFormModel>({ required: true });
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div>
      <label class="mb-1 block text-sm font-semibold text-gray-600" for="fullName">Full Name</label>
      <input
        id="fullName"
        v-model="model.fullName"
        type="text"
        class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-300 focus:outline-none focus:ring"
        required
      />
    </div>

    <div>
      <label class="mb-1 block text-sm font-semibold text-gray-600" for="username">Username</label>
      <input
        id="username"
        v-model="model.username"
        type="text"
        class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-300 focus:outline-none focus:ring"
        required
      />
    </div>

    <div>
      <label class="mb-1 block text-sm font-semibold text-gray-600" for="email">Email</label>
      <input
        id="email"
        v-model="model.email"
        type="email"
        class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-300 focus:outline-none focus:ring"
        required
      />
    </div>

    <div v-if="includeRole">
      <label class="mb-1 block text-sm font-semibold text-gray-600" for="role">Role</label>
      <select
        id="role"
        v-model="model.role"
        class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-300 focus:outline-none focus:ring"
        required
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    <div v-if="includePassword">
      <label class="mb-1 block text-sm font-semibold text-gray-600" for="password">Password</label>
      <input
        id="password"
        v-model="model.password"
        type="password"
        minlength="6"
        class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-300 focus:outline-none focus:ring"
        required
      />
    </div>
  </div>
</template>
