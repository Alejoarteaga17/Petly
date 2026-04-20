// Author: Alejandro Arteaga
export type UserRole = 'user' | 'admin';

export interface UserInterface {
    id: number;
    fullName: string;
    email: string;
    role: UserRole;
    username: string;
    }
