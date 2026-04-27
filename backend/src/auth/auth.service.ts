// Author: Alejandro Arteaga
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
        const { username, password } = loginUserDto;

        const user = await this.userService.findByUsernameWithPassword(username);

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = {
            sub: user.id,
            fullName: user.fullName,
            username: user.username,
            role: user.role,
            email: user.email,
        };

        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}