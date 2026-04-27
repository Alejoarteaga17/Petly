// Author: Alejandro Arteaga
// External imports
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Req,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

// Internal imports
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserService } from '../users/user.service';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(Number(id));
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.register(createUserDto);
  }
  // The service returns null when the target user does not exist.
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ): Promise<User | null> {
    const authUser = req['user'] as { sub?: number } | undefined;
    // Only allow role changes if the requester is an admin.
    if (updateUserDto.role) {
      const requesterId = Number(authUser?.sub);
      if (!requesterId) {
        throw new ForbiddenException(
          'Only administrators can change user roles',
        );
      }

      const requester = await this.userService.findOne(requesterId);
      if (!requester || requester.role !== 'admin') {
        throw new ForbiddenException(
          'Only administrators can change user roles',
        );
      }
    }

    return this.userService.update(Number(id), updateUserDto);
  }
}
