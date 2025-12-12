import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/crypto/hashPassword';
import { CreateUserDto } from 'src/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.getByLogin(dto.login);
    if (!user || !(await comparePassword(dto.password, user.password))) {
      throw new ForbiddenException('Incorrect login or password');
    }
    return this.generateTokens(user.id, user.login);
  }

  private async generateTokens(userId: string, login: string) {
    const payload = { userId, login };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY!,
      expiresIn: (process.env.TOKEN_EXPIRE_TIME || '1h') as any,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY!,
      expiresIn: (process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h') as any,
    });
    return { accessToken, refreshToken };
  }
}
