import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserService as FrontUsersService } from '../../front/user/services/user.service';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [FrontUsersService, PrismaService, UsersService],
})
export class UsersModule {}
