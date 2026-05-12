import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    findByUsernameWithPassword(username: string): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User | null>;
    register(createUserDto: CreateUserDto): Promise<User>;
}
