import { Injectable, NotFoundException } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(
    name: string,
    options?: Prisma.CategoryFindUniqueArgs,
  ): Promise<Category> {
    const category = await this.prismaService.category.findUnique({
      where: {
        name,
      },
      ...options,
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async findAll(): Promise<Category[]> {
    return await this.prismaService.category.findMany();
  }
}
