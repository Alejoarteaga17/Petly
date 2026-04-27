// Author: Alejandro Arteaga

import type { UserRole } from '@/interfaces/UserInterface';

export interface CreateUserDTO {
  fullName: string;
  email: string;
  username: string;
  password: string;
  role?: UserRole;
}
