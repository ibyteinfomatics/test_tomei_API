import { Body, Controller, Get, Param, Patch, Post,Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { loginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get(':userId')
  // async getUser(@Param('userId') userId: string): Promise<User> {
  //   return this.usersService.getUserById(userId);
  // }

  @Get()
  async getUsers(): Promise<User[]> {
      return this.usersService.getUsers();
  }

  @Post("/register")
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.usersService.createUser(createUserDto)
  }

  // @Post("/login")
  // async loginUser(@Body() loginUserDto: loginUserDto): Promise<User> {
  //     return this.usersService.loginUser(loginUserDto)
  // }
  @Post('auth/login')
  async loginUser(@Request() req) {
    return this.usersService.loginUser(req.body)
  }

  @Patch(':userId')
  async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
      return this.usersService.updateUser(userId, updateUserDto);
  }
}
