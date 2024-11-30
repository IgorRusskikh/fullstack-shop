import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.product.findMany();
  }

  async findBySlug(slug: string) {
    const product = await this.prismaService.product.findUnique({
      where: {
        slug: slug
      },
    });

    if (!product) {
      return null;
    }

    return product;
  }
}
