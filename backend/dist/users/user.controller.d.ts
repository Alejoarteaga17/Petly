import type { Request } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserService } from '../users/user.service';
import { User } from '../users/entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    register(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto, req: Request): Promise<User | null>;
}
