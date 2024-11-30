import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { ProductsService as FrontProductService } from 'src/modules/front/products/services/products.service';
import { CategoriesService } from '../../categories/services/categories.service';
import { CreateProductDto } from '../dtos/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly frontProductService: FrontProductService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(productCreateDto: CreateProductDto) {
    const product = await this.frontProductService.findOne(
      productCreateDto.slug,
    );

    if (product) {
      throw new BadRequestException('Product already exists');
    }

    const categories = await this.categoriesService.findMany(
      productCreateDto.categoryIds,
    );

    if (categories.length !== productCreateDto.categoryIds.length) {
      throw new BadRequestException('One or more categories do not exist');
    }

    return this.prismaService.product.create({
      data: {
        ...productCreateDto,
        Category: {
          connect: categories.map((category) => ({ id: category.id })),
        },
      },
    });
  }
}
