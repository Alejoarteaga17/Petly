// Author: Alejandro Arteaga & Alejandra Suarez
import type { ReviewInterface } from '@/interfaces/ReviewInterface'; 
import axios from 'axios'; 
 
export class ReviewService { 
  private static readonly API_URL = 'http://localhost:3000/api/reviews'; 
 
  static async getReviews(): Promise<ReviewInterface[]> { 
    const { data } = await axios.get(this.API_URL); 
    return data; 
  } 
 
  static async getReviewsByDomesticAnimalId(domesticAnimalId: number): Promise<ReviewInterface[]> { 
    const { data } = await axios.get(`${this.API_URL}/domestic-animal/${domesticAnimalId}`); 
    return data; 
  } 

  static async getReviewsByUserId(userId: number): Promise<ReviewInterface[]> {
    const { data } = await axios.get(`${this.API_URL}/user-reviews/${userId}`);
    return data;
  }
 
  static async createReview(review: Omit<ReviewInterface, 'id' | 'createdAt'>): Promise<ReviewInterface> { 
    const { data } = await axios.post(this.API_URL, review); 
    return data; 
  } 
} 