import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { UserService } from '../user/services/user.service';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService, PrismaService, UserService],
})
export class AccountModule {}
