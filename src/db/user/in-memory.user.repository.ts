import {
  User,
  CreateUserDto,
  UpdatePasswordDto,
} from 'src/interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private readonly store = new Map<string, User>();

  async getAll(): Promise<User[]> {
    return Array.from(this.store.values());
  }

  async getById(id: string): Promise<User | undefined> {
    return this.store.get(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const newUser: User = {
      id: uuidv4(),
      login: dto.login,
      version: 1,
      password: dto.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.store.set(newUser.id, newUser);
    return newUser;
  }

  async update(id: string, data: UpdatePasswordDto): Promise<User | undefined> {
    const user: User | undefined = await this.getById(id);
    if (user === undefined) return undefined;
    const updated: User = {
      id: user.id,
      login: user.login,
      version: user.version + 1,
      password: data.newPassword,
      createdAt: user.createdAt,
      updatedAt: Date.now(),
    };
    this.store.set(user.id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const user: User | undefined = await this.getById(id);
    if (user === undefined) return false;
    return this.store.delete(id);
  }
}
