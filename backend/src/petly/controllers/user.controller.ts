import { Controller, Get, Param, Post, Body } from '@nestjs/common'; 
import { UserService } from "../services/user.service";
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';


@Controller('users')
export class UserController {
  // Define your user-related endpoints here
  constructor( private readonly userService: UserService) {}
    
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(Number(id));
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}