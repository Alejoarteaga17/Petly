// Authors: Alejandro Arteaga & Alejandra Suarez
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface';
import type { CreateDomesticAnimalDTO } from '@/dtos/CreateDomesticAnimalDTO.js';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

export class DomesticAnimalService {
  private static readonly API_URL = 'http://localhost:3000/api/domestic-animals';

  private static authConfig() {
    const authStore = useAuthStore();
    return { headers: authStore.authHeaders };
  }

  public static async getAll(): Promise<DomesticAnimalInterface[]> {
    const { data } = await axios.get(this.API_URL, this.authConfig());
    return data;
  }

  public static async getById(id: number): Promise<DomesticAnimalInterface> {
    const { data } = await axios.get(`${this.API_URL}/${id}`, this.authConfig());
    return data;
  }

  public static async createDomesticAnimal(
    domesticAnimal: CreateDomesticAnimalDTO,
  ): Promise<DomesticAnimalInterface> {
    const { data } = await axios.post(this.API_URL, domesticAnimal, this.authConfig());
    return data;
  }

  public static async updateDomesticAnimal(
    id: number,
    domesticAnimal: CreateDomesticAnimalDTO,
  ): Promise<DomesticAnimalInterface> {
    const { data } = await axios.put(`${this.API_URL}/${id}`, domesticAnimal, this.authConfig());
    return data;
  }

  public static async deleteDomesticAnimal(id: number): Promise<boolean> {
    const { data } = await axios.delete(`${this.API_URL}/${id}`, this.authConfig());
    return Boolean(data);
  }
}
