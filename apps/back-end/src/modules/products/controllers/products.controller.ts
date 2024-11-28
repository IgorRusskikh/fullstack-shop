import { Controller } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductsController {
  findOne(slug: string) {
    // return this.productsService.findOne(slug);
  }

  // findAll() {
  //   // return this.productsService.findAll();
  // }
}
