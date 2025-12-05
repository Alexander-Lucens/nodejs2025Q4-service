import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// import { InMemoryUserRepository } from 'src/db/user/in-memory.user.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaUserRepository } from 'src/db/user/prisma.user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: PrismaUserRepository, // InMemoryUserRepository
    },
    UserService,
  ],
  exports: ['USER_REPOSITORY'],
})
export class UserModule {}
