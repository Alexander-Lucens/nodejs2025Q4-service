import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/db/user.repository.interface';
import {
  CreateUserDto,
  UpdatePasswordDto,
} from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private repository: IUserRepository) {}

  async getAll() {
    return this.repository.getAll();
  }

  async getById(id: string) {
    return this.repository.getById(id);
  }

  async create(data: CreateUserDto) {
    return this.repository.create(data);
  }

  async update(id: string, data: UpdatePasswordDto) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
