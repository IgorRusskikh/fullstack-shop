import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { ProductsService as FrontProductService } from 'src/modules/front/products/services/products.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly frontProductService: FrontProductService,
  ) {}

  async create(productCreateDto: Prisma.ProductCreateInput) {
    const product = await this.frontProductService.findBySlug(
      productCreateDto.slug,
    );

    if (product) {
      throw new BadRequestException('Product already exists');
    }

    return this.prismaService.product.create({ data: productCreateDto });
  }
}
