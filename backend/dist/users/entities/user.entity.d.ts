import { Review } from '../../domesticAnimals/entities/review.entity';
export declare const USER_ROLES: readonly ["user", "admin"];
export type UserRole = (typeof USER_ROLES)[number];
export declare class User {
    id: number;
    fullName: string;
    email: string;
    role: UserRole;
    username: string;
    password: string;
    reviews: Review[];
}
