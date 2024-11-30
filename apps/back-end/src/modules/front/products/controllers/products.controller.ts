import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from '../services/products.service';

@Controller({ host: process.env.API_HOST, path: 'products' })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}
