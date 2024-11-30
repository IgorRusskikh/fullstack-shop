import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByPhone(phone: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        phone,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const existingUserByPhone = await this.findOneByPhone(data.phone);
    const existingUserByEmail = await this.findOneByEmail(data.email);

    if (existingUserByPhone || existingUserByEmail) {
      throw new ConflictException('User already exists');
    }

    if (data.password) {
      data.password = await argon2.hash(data.password);
    }

    return this.prismaService.user.create({
      data,
    });
  }

  async delete(id: string) {
    const user = this.prismaService.user.delete({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return 'User deleted';
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async patch(id: string, data: Prisma.UserUpdateInput) {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
