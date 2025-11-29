import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/db/user.repository.interface';
import {
  CreateUserDto,
  ResUserData,
  UpdatePasswordDto,
  User,
} from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private repository: IUserRepository) {}

  async getAll() {
    const users: User[] = await this.repository.getAll();
    const out: ResUserData[] = users;
    return out;
  }

  async getById(id: string) {
    const user: User | undefined = await this.repository.getById(id);
    if (user === undefined) {
      throw new NotFoundException('User not found');
    }
    const out: ResUserData = user;
    return out;
  }

  async create(data: CreateUserDto) {
    const user: User = await this.repository.create(data);
    const out: ResUserData = user;
    return out;
  }

  async update(id: string, data: UpdatePasswordDto) {
    const user: User | undefined = await this.repository.update(id, data);
    if (user === undefined) {
      throw new NotFoundException('User not found');
    }
    const out: ResUserData = user;
    return out;
  }

  async delete(id: string) {
    const respons = await this.repository.delete(id);
    if (!respons) {
      throw new NotFoundException('User not found');
    }
  }
}
