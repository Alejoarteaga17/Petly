<!-- Author: Alejandro Arteaga -->
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import type { UserInterface } from '@/interfaces/UserInterface';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { ReviewService } from '@/services/ReviewService';
import { UserService } from '@/services/UserService';

// Reactive variables
const authUser = ref<UserInterface | null>(null);
const showReviews = ref(false);
const reviews = ref<ReviewInterface[]>([]);
const loadingReviews = ref(false);
const reviewsError = ref('');
const isEditing = ref(false);
const isSavingProfile = ref(false);
const profileError = ref('');
const profileSuccess = ref('');
// Form for editing profile info so we don't directly modify the authUser data until saving
const editForm = ref({
  fullName: '',
  username: '',
  email: '',
});

const router = useRouter();
const profileFields = computed(() => {
  if (!authUser.value) return [];

  return [
    { label: 'Full Name', value: authUser.value.fullName },
    { label: 'Username', value: authUser.value.username },
    { label: 'Email', value: authUser.value.email },
    { label: 'Role', value: authUser.value.role },
  ];
});

function loadAuthUser() {
  const stored = localStorage.getItem('authUser');
  authUser.value = stored ? (JSON.parse(stored) as UserInterface) : null;

  if (authUser.value) {
    editForm.value = {
      fullName: authUser.value.fullName,
      username: authUser.value.username,
      email: authUser.value.email,
    };
  }
}

async function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('authUser');
  authUser.value = null;
  showReviews.value = false;
  reviews.value = [];
  await router.push('/');
}

function startEditing() {
  if (!authUser.value || authUser.value.role !== 'user') return;

  editForm.value = {
    fullName: authUser.value.fullName,
    username: authUser.value.username,
    email: authUser.value.email,
  };

  profileError.value = '';
  profileSuccess.value = '';
  isEditing.value = true;
}

function cancelEditing() {
  isEditing.value = false;
  profileError.value = '';
  profileSuccess.value = '';
}

async function saveProfile() {
  if (!authUser.value) return;

  const payload = {
    fullName: editForm.value.fullName.trim(),
    username: editForm.value.username.trim(),
    email: editForm.value.email.trim(),
  };
  // Basic validation in case somethings missing
  if (!payload.fullName || !payload.username || !payload.email) {
    profileError.value = 'Full name, username and email are required.';
    return;
  }

  isSavingProfile.value = true;
  profileError.value = '';
  profileSuccess.value = '';

  try {
    const updatedUser = await UserService.updateUser(authUser.value.id, payload);
    authUser.value = updatedUser;
    localStorage.setItem('authUser', JSON.stringify(updatedUser));
    isEditing.value = false;
    profileSuccess.value = 'Profile updated successfully.';
  } catch (error: any) {
    console.error(error);
    profileError.value = error?.response?.data?.message || 'Could not update profile right now.';
  } finally {
    isSavingProfile.value = false;
  }
}

async function toggleReviews() {
  showReviews.value = !showReviews.value;

  if (!showReviews.value || !authUser.value || reviews.value.length > 0) {
    return;
  }

  loadingReviews.value = true;
  reviewsError.value = '';

  try {
    reviews.value = await ReviewService.getReviewsByUserId(authUser.value.id);
  } catch (error) {
    console.error(error);
    reviewsError.value = 'Could not load your reviews right now.';
  } finally {
    loadingReviews.value = false;
  }
}

function formatDate(iso?: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
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
          v-if="authUser?.role === 'user' && !isEditing"
          type="button"
          class="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          @click="startEditing"
        >
          Edit info
        </button>
      </div>
      <div v-if="authUser" class="space-y-4">
        <form v-if="isEditing" class="space-y-4 rounded-lg border border-blue-100 bg-blue-50 p-4" @submit.prevent="saveProfile">
          <div>
            <label class="mb-1 block text-sm font-semibold text-gray-600" for="fullName">Full Name</label>
            <input
              id="fullName"
              v-model="editForm.fullName"
              type="text"
              class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-300 focus:outline-none focus:ring"
              required
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-gray-600" for="username">Username</label>
            <input
              id="username"
              v-model="editForm.username"
              type="text"
              class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-300 focus:outline-none focus:ring"
              required
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-gray-600" for="email">Email</label>
            <input
              id="email"
              v-model="editForm.email"
              type="email"
              class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-300 focus:outline-none focus:ring"
              required
            />
          </div>

    
          <p v-if="profileError" class="text-sm text-red-600">{{ profileError }}</p>

          <div class="flex items-center gap-3">
            <button
              type="submit"
              :disabled="isSavingProfile"
              class="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {{ isSavingProfile ? 'Saving...' : 'Save changes' }}
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

        <p v-if="profileSuccess" class="text-sm text-green-600">{{ profileSuccess }}</p>

        <div
          v-for="field in profileFields"
          :key="field.label"
          class="flex flex-col gap-1 rounded-lg border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span class="text-sm font-semibold text-gray-500">{{ field.label }}</span>
          <span class="text-base font-medium text-gray-800">{{ field.value }}</span>
        </div>

        <div class="pt-2 flex items-center justify-between gap-4">
          <button
            type="button"
            class="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            @click="toggleReviews"
          >
            {{ showReviews ? 'Hide my reviews' : 'Show my reviews' }}
          </button>
                  <button
          v-if="authUser"
          type="button"
          class="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          @click="logout"
        >
          Logout
        </button>
        </div>

        <div v-if="showReviews" class="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h3 class="mb-4 text-lg font-semibold text-gray-800">My Reviews</h3>

          <p v-if="loadingReviews" class="text-sm text-gray-500">Loading your reviews...</p>
          <p v-else-if="reviewsError" class="text-sm text-red-600">{{ reviewsError }}</p>

          <div v-else-if="reviews.length > 0" class="space-y-3">
            <div
              v-for="review in reviews"
              :key="review.id"
              class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div class="mb-2 flex items-center justify-between gap-2">
                <RouterLink
                  v-if="review.domesticAnimal?.id"
                  :to="`/domesticAnimals/${review.domesticAnimal.id}`"
                  class="text-sm font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
                >
                  {{ review.domesticAnimal.breed }}
                </RouterLink>
                <span v-else class="text-sm font-semibold text-gray-700">
                  {{ review.domesticAnimalId ? `Domestic Animal #${review.domesticAnimalId}` : 'Domestic Animal' }}
                </span>
                <span class="text-amber-500 text-sm" :title="`${review.rating} stars`">
                  {{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}
                </span>
              </div>
              <p class="text-sm text-gray-600 whitespace-pre-wrap">{{ review.comment }}</p>
              <p v-if="review.createdAt" class="mt-2 text-xs text-gray-400">
                {{ formatDate(review.createdAt) }}
              </p>
            </div>
          </div>

          <p v-else class="text-sm text-gray-500">You haven't written reviews yet.</p>
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
