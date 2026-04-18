import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }
    // Deberiamos llamarlo newUser o dejarlo user?
    create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

}