// Author: Alejandro Arteaga
import type { UserRole } from '../entities/user.entity';

// This DTO is used for updating user information. 
// It allows partial updates, meaning that any of the fields can be optional.
export class UpdateUserDto {
  fullName?: string;
  email?: string;
  username?: string;
  role?: UserRole;
}
