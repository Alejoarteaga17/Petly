// Author: Alejandro Arteaga
import type { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  fullName!: string;
  email!: string;
  role?: UserRole;
  username!: string;
  password!: string;
}
