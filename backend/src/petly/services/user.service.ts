// Author: Alejandro Arteaga
import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            return null;
        }

        const email = updateUserDto.email?.trim();
        const username = updateUserDto.username?.trim();

        if (email && email !== user.email) {
            const existingByEmail = await this.userRepository.findOne({ where: { email } });
            if (existingByEmail && existingByEmail.id !== id) {
                throw new ConflictException("Theres already a registered user with that email");
            }
            user.email = email;
        }

        if (username && username !== user.username) {
            const existingByUsername = await this.userRepository.findOne({ where: { username } });
            if (existingByUsername && existingByUsername.id !== id) {
                throw new ConflictException("Theres already a registered user with that username");
            }
            user.username = username;
        }

        if (updateUserDto.fullName?.trim()) {
            user.fullName = updateUserDto.fullName.trim();
        }

        return this.userRepository.save(user);
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        const { email, username, fullName, password } = createUserDto;

        const existingUser = await this.userRepository.findOne({
            where: [{ email }, { username }],
        });

        if (existingUser) {
            throw new ConflictException(
                "Theres already a registered user with that email or username",
            );
        }
        // Hash the password before saving the user to the database.
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            fullName,
            email,
            role: createUserDto.role ?? "user",
            username,
            password: hashedPassword,
        });

        return this.userRepository.save(user);
    }

    async login(loginUserDto: LoginUserDto) {
        const { username, password } = loginUserDto;

        const user = await this.userRepository
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.username = :username", { username })
            .getOne();

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role,
            email: user.email,
        };

        return {
            accessToken: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                username: user.username,
            },
        };
    }

}