import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getAll() {
    return this.prismaService.account.findMany();
  }

  async findOneOrCreate(accountCreateDto: Prisma.AccountCreateInput) {
    const account = await this.prismaService.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: accountCreateDto.provider,
          providerAccountId: accountCreateDto.providerAccountId,
        },
      },
      include: {
        user: true,
      },
    });

    if (account !== null) {
      return account;
    }

    const newUser = await this.userService.create({});

    const newAccount = await this.prismaService.account.create({
      data: {
        ...accountCreateDto,
        user: {
          connect: {
            id: newUser.id,
          },
        },
      },
    });

    return newAccount;
  }

  async authorize(accountCreateDto: Prisma.AccountCreateInput) {
    const account = await this.findOneOrCreate(accountCreateDto);

    if (!account) {
      throw new BadRequestException('Cannot create account');
    }

    return account;
  }
}
