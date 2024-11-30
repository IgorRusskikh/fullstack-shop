import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Prisma } from '@prisma/client';
import { ProductsService as FrontProductsService } from 'src/modules/front/products/services/products.service';

@Controller({ host: process.env.PANEL_HOST, path: 'products' })
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly frontProductsService: FrontProductsService,
  ) {}
  @Get()
  findAll() {
    return this.frontProductsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.frontProductsService.findBySlug(slug);
  }

  @Post()
  create(@Body() productCreateDto: Prisma.ProductCreateInput) {
    return this.productsService.create(productCreateDto);
  }
}
