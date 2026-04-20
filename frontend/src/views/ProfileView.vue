<!-- Author: Alejandro Arteaga -->
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import type { UserInterface } from '@/interfaces/UserInterface';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { ReviewService } from '@/services/ReviewService';

// Reactive variables
const authUser = ref<UserInterface | null>(null);
const showReviews = ref(false);
const reviews = ref<ReviewInterface[]>([]);
const loadingReviews = ref(false);
const reviewsError = ref('');

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
  showReviews.value = false;
  reviews.value = [];
  await router.push('/');
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

        <div class="pt-2">
          <button
            type="button"
            class="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            @click="toggleReviews"
          >
            {{ showReviews ? 'Hide my reviews' : 'Show my reviews' }}
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
