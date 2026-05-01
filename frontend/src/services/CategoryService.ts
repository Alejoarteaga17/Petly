// Author: Alejandro Arteaga

import type { CategoryInterface } from '@/interfaces/CategoryInterface';
import type { CreateCategoryDTO } from '@/dtos/CreateCategoryDTO';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { CATEGORIES_API_URL } from '@/config/api';

export class CategoryService {
  private static readonly API_URL = CATEGORIES_API_URL;

  private static authConfig() {
    const authStore = useAuthStore();
    return { headers: authStore.authHeaders };
  }

  public static async getAll(): Promise<CategoryInterface[]> {
    const { data } = await axios.get(this.API_URL, this.authConfig());
    return data;
  }

  public static async getById(id: number): Promise<CategoryInterface> {
    const { data } = await axios.get(`${this.API_URL}/${id}`, this.authConfig());
    return data;
  }

  public static async createCategory(
    category: CreateCategoryDTO,
  ): Promise<CategoryInterface> {
    const { data } = await axios.post(this.API_URL, category, this.authConfig());
    return data;
  }

  public static async updateCategory(
    id: number,
    category: CreateCategoryDTO,
  ): Promise<CategoryInterface> {
    const { data } = await axios.put(`${this.API_URL}/${id}`, category, this.authConfig());
    return data;
  }

  public static async deleteCategory(id: number): Promise<boolean> {
    const { data } = await axios.delete(`${this.API_URL}/${id}`, this.authConfig());
    return Boolean(data);
  }
}
