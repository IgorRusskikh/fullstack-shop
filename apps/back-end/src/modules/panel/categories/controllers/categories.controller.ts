import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoriesService as FrontCategoriesService } from 'src/modules/front/categories/services/categories.service';
import { CategoriesService } from '../services/categories.service';

@Controller({ host: process.env.PANEL_HOST, path: 'categories' })
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly frontCategoriesService: FrontCategoriesService,
  ) {}

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.frontCategoriesService.findOne(name);
  }

  @Get()
  findAll() {
    return this.frontCategoriesService.findAll();
  }

  @Post()
  async create(@Body() createCategoryDto: Prisma.CategoryCreateInput) {
    return;
  }
}
