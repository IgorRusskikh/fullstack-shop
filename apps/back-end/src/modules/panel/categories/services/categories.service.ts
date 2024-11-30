import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

/**
 * Service for managing categories in the admin panel.
 * Provides methods for creating and checking existence of categories.
 */
@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(names: string[]) {
    return await this.prismaService.category.findMany({
      where: {
        name: {
          in: names,
        },
      },
    });
  }

  /**
   * Creates a new category
   * @param createCategoryDto - DTO containing category creation data
   * @returns The newly created category
   * @throws ConflictException if category with the same name already exists
   */
  async create(createCategoryDto: Prisma.CategoryCreateInput) {
    const existingCategory = await this.prismaService.category.findUnique({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }

    return this.prismaService.category.create({ data: createCategoryDto });
  }
}
