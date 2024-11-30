import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(slug: string, options?: Prisma.ProductFindUniqueArgs) {
    const product = await this.prismaService.product.findUnique({
      where: {
        slug: slug,
      },
      ...options,
    });

    if (!product) {
      return null;
    }

    return product;
  }
}
