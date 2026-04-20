import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface'; 
import type { CreateDomesticAnimalDTO } from '@/dtos/CreateDomesticAnimalDTO.js'; 
import axios from 'axios'; 
 
export class DomesticAnimalService { 
  private static readonly API_URL = 'http://localhost:3000/api/domestic-animals'; 
 
  public static async getAll(): Promise<DomesticAnimalInterface[]> { 
    const { data } = await axios.get(this.API_URL); 
    return data; 
  } 
 
  public static async getById(id: number): Promise<DomesticAnimalInterface> { 
    const { data } = await axios.get(`${this.API_URL}/${id}`); 
    return data; 
  } 
 
  public static async createDomesticAnimal(domesticAnimal: CreateDomesticAnimalDTO): Promise<DomesticAnimalInterface> { 
    const { data } = await axios.post(this.API_URL, domesticAnimal); 
    return data; 
  } 
} 