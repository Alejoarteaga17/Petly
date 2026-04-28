import type { UserRole } from '../entities/user.entity';
export declare class CreateUserDto {
    fullName: string;
    email: string;
    role?: UserRole;
    username: string;
    password: string;
}
