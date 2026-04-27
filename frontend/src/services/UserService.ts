// Author: Alejandro Arteaga

// External imports
import axios from 'axios';

// Internal imports
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import { useAuthStore } from '@/stores/auth';

// We make a personalized response for the login, 
// since the backend returns a token and the user
type LoginResponse = {
    accessToken: string;
};

export class UserService {
    private static readonly API_URL = 'http://localhost:3000/api/users';
    private static readonly AUTH_URL = 'http://localhost:3000/api/auth';

    private static authConfig() {
        const authStore = useAuthStore();
        return { headers: authStore.authHeaders };
    }
    
    public static async getAll(): Promise<UserInterface[]> {
        const { data } = await axios.get(this.API_URL, this.authConfig());
        return data;
    }
    
    public static async getById(id: number): Promise<UserInterface> {
        const { data } = await axios.get(`${this.API_URL}/${id}`, this.authConfig());
        return data;
    }
    
    public static async registerUser(user: CreateUserDTO): Promise<UserInterface> {
        const { data } = await axios.post(`${this.API_URL}/register`, user);
        return data;
    }

    public static async loginUser(credentials: { username: string; password: string }): Promise<LoginResponse> {
        const { data } = await axios.post(`${this.AUTH_URL}/login`, credentials);
        return data;
    }

    public static async updateUser(
        id: number,
        updates: Partial<Pick<UserInterface, 'fullName' | 'email' | 'username'>>,
    ): Promise<UserInterface> {
        const { data } = await axios.put(`${this.API_URL}/${id}`, updates, this.authConfig());
        return data;
    }
}