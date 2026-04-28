import type { UserRole } from '../entities/user.entity';
export declare class UpdateUserDto {
    fullName?: string;
    email?: string;
    username?: string;
    role?: UserRole;
}
