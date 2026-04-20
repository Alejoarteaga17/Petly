// Author: Alejandro Arteaga
// Esta bien hacer un dto casi que copiando los datos de la interfaz?
// es solo que en la interfaz como se usa para consultas no necesitamos el password,
//  pero en el dto si, por eso lo hice asi
import type { UserRole } from '@/interfaces/UserInterface';

export interface CreateUserDTO {
	fullName: string;
	email: string;
	username: string;
	password: string;
	role?: UserRole;
}