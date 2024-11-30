import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';

@Controller({ host: process.env.FRONT_HOST, path: 'categories' })
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.categoriesService.findOne(name, {
      where: { name },
      include: {
        Product: true,
      },
    });
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
}
