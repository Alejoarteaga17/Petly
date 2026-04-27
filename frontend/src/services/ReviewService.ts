// Author: Alejandro Arteaga & Alejandra Suarez & Camila Velez
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

export class ReviewService {
  private static readonly API_URL = 'http://localhost:3000/api/reviews';

  private static authConfig() {
    const authStore = useAuthStore();
    return { headers: authStore.authHeaders };
  }

  static async getReviews(): Promise<ReviewInterface[]> {
    const { data } = await axios.get(this.API_URL, this.authConfig());
    return data;
  }

  static async getReviewsByDomesticAnimalId(domesticAnimalId: number): Promise<ReviewInterface[]> {
    const { data } = await axios.get(
      `${this.API_URL}/domestic-animal/${domesticAnimalId}`,
      this.authConfig(),
    );
    return data;
  }

  static async getReviewsByUserId(userId: number): Promise<ReviewInterface[]> {
    const { data } = await axios.get(`${this.API_URL}/user-reviews/${userId}`, this.authConfig());
    return data;
  }

  static async createReview(
    review: Omit<ReviewInterface, 'id' | 'createdAt'>,
  ): Promise<ReviewInterface> {
    const { data } = await axios.post(this.API_URL, review, this.authConfig());
    return data;
  }
}
