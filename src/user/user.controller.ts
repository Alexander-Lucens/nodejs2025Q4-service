import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const user: Promise<User | undefined> = this.userService.getById(id);
    if (user === undefined) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Put()
  updatePassword(@Param('id') id: string, @Body() body: UpdatePasswordDto) {
    return this.userService.update(id, body);
  }

  @Delete()
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
