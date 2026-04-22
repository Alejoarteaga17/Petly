// Author: Alejandro Arteaga
import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common'; 
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from "../services/user.service";
import { User } from '../entities/user.entity';



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

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
  // Segun como definimos el dto, entonces acá si puede estar null?
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userService.update(Number(id), updateUserDto);
  }
}