// Author: Alejandro Arteaga
import { Body, Controller, Get, NotFoundException, Post, Request, UseGuards } from '@nestjs/common';
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthService } from "./auth.service";
import { Public } from './public.decorator';
import { AuthGuard } from './auth.guard';
import { NotFoundError } from 'rxjs';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Public()
    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
      return this.authService.login(loginUserDto);
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        if (!req.user) {
            throw new NotFoundException("User not authenticated");
        }
        return req.user;
  }
}