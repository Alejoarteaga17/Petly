// Author: Alejandro Arteaga
import axios from 'axios';
import type { UserInterface } from '@/interfaces/UserInterface';

// Hacemos una respuesta personalizada para el login, 
// ya que el backend devuelve un token y el usuario
type LoginResponse = {
    accessToken: string;
    user: UserInterface;
};

export class UserService {
    private static readonly API_URL = 'http://localhost:3000/api/users';
    
    public static async getUsers(): Promise<UserInterface[]> {
        const { data } = await axios.get(this.API_URL);
        return data;
    }
    
    public static async getUserById(id: number): Promise<UserInterface> {
        const { data } = await axios.get(`${this.API_URL}/${id}`);
        return data;
    }
    
    public static async registerUser(user: Omit<UserInterface, 'id'>): Promise<UserInterface> {
        const { data } = await axios.post(`${this.API_URL}/register`, user);
        return data;
    }

    public static async loginUser(credentials: { username: string; password: string }): Promise<LoginResponse> {
        const { data } = await axios.post(`${this.API_URL}/login`, credentials);
        return data;
    }
}