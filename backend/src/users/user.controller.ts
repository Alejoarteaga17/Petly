// Author: Alejandro Arteaga
import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common'; 
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserService } from "../users/user.service";
import { User } from '../users/entities/user.entity';


@Controller('users')
export class UserController {
  constructor( private readonly userService: UserService) {}
    
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
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userService.update(Number(id), updateUserDto);
  }
}