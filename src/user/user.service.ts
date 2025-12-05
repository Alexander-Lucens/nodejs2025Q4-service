import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { comparePassword } from 'src/crypto/hashPassword';
import { IUserRepository } from 'src/db/user/user.repository.interface';
import {
  CreateUserDto,
  UserResponse,
  UpdatePasswordDto,
  User,
} from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private repository: IUserRepository) {}

  async getAll() {
    const users: User[] = await this.repository.getAll();
    return plainToInstance(UserResponse, users);
  }

  async getById(id: string) {
    const user: User | undefined = await this.repository.getById(id);
    if (user === undefined) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(UserResponse, user);
  }

  async create(data: CreateUserDto) {
    const user: User = await this.repository.create(data);
    return plainToInstance(UserResponse, user);
  }

  async update(id: string, data: UpdatePasswordDto) {
    const user: User | undefined = await this.repository.getById(id);
    if (user === undefined) {
      throw new NotFoundException('User not found');
    }
    if (!(await comparePassword(data.oldPassword, user.password))) {
      throw new ForbiddenException('Old password is wrong');
    }
    const uUser: User | undefined = await this.repository.update(id, data);
    if (uUser === undefined) {
      throw new NotFoundException('User not found during update');
    }
    return plainToInstance(UserResponse, uUser);
  }

  async delete(id: string) {
    const respons = await this.repository.delete(id);
    if (!respons) {
      throw new NotFoundException('User not found');
    }
  }
}
