<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { ReviewService } from '@/services/ReviewService.js';
import type { ReviewInterface } from '@/interfaces/ReviewInterface.js';
import type { UserInterface } from '@/interfaces/UserInterface';

const props = defineProps<{
  domesticAnimalId: number;
}>();

const reviews = ref<ReviewInterface[]>([]);
const authUser = ref<UserInterface | null>(null);
const isSubmitting = ref(false);
const form = ref({
  rating: 5,
  comment: '',
});

const isUserLoggedIn = computed(() => authUser.value !== null);

async function submitReview() {
  if (!form.value.comment.trim() || !authUser.value) return;

  isSubmitting.value = true;

  await ReviewService.createReview({
    domesticAnimalId: props.domesticAnimalId,
    rating: Math.min(5, Math.max(1, form.value.rating)),
    comment: form.value.comment.trim(),
    userId: authUser.value.id,
  });

  form.value = { rating: 5, comment: '' };
  isSubmitting.value = false;

  getReviews();
}

function formatDate(iso?: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

async function getReviews() {
  reviews.value = await ReviewService.getReviewsByDomesticAnimalId(props.domesticAnimalId);
}

function loadAuthUser() {
  const stored = localStorage.getItem('authUser');
  if (stored) {
    authUser.value = JSON.parse(stored);
  }
}

onMounted(() => {
  loadAuthUser();
  getReviews();
});
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold text-gray-800">Reviews</h3>

    <!-- Auth required message -->
    <div v-if="!isUserLoggedIn" class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
      <p class="text-sm text-gray-700 mb-3">You must be logged in to post a review.</p>
      <div class="flex gap-2">
        <RouterLink to="/login" class="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition">
          Log in
        </RouterLink>
        <RouterLink to="/register" class="bg-green-500 text-white font-medium py-2 px-4 rounded hover:bg-green-600 transition">
          Register
        </RouterLink>
      </div>
    </div>

    <!-- Create review form (only for logged-in users) -->
    <div v-if="isUserLoggedIn" class="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Add a review</h4>
      <form @submit.prevent="submitReview" class="space-y-3">
        <div>
          <label for="rating" class="block text-sm text-gray-600 mb-1">Rating</label>
          <select
            id="rating"
            v-model.number="form.rating"
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option v-for="n in 5" :key="n" :value="n">{{ n }} star{{ n > 1 ? 's' : '' }}</option>
          </select>
        </div>
        <div>
          <label for="comment" class="block text-sm text-gray-600 mb-1">Comment</label>
          <textarea
            id="comment"
            v-model="form.comment"
            rows="3"
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Write your review..."
            required
          />
        </div>
        <button
          type="submit"
          :disabled="isSubmitting || !form.comment.trim()"
          class="bg-orange-500 text-white font-medium py-2 px-4 rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Post review
        </button>
      </form>
    </div>

    <!-- Review list -->
    <ul class="space-y-4">
      <li
        v-for="review in reviews"
        :key="review.id"
        class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
      >
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="font-medium text-gray-800">{{ review.user?.fullName || 'Anonymous' }}</span>
          <span class="text-amber-500 text-sm" :title="`${review.rating} stars`">
            {{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}
          </span>
        </div>
        <p class="text-gray-600 text-sm whitespace-pre-wrap">{{ review.comment }}</p>
        <p v-if="review.createdAt" class="text-gray-400 text-xs mt-2">
          {{ formatDate(review.createdAt) }}
        </p>
      </li>
      <li v-if="reviews.length === 0" class="text-gray-500 text-sm py-4">
        No reviews yet. Be the first to review!
      </li>
    </ul>
  </div>
</template>