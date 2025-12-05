import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { InMemoryUserRepository } from 'src/db/user/in-memory.user.repository';

@Module({
  controllers: [UserController],
  providers: [
    { provide: 'USER_REPOSITORY', useClass: InMemoryUserRepository },
    UserService,
  ],
  exports: ['USER_REPOSITORY'],
})
export class UserModule {}
