import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoriesService as FrontCategoriesService } from 'src/modules/front/categories/services/categories.service';

import { CategoriesService } from '../services/categories.service';

/**
 * Controller for managing categories in the admin panel.
 * Provides API endpoints for creating, retrieving and viewing categories.
 */
@Controller({ host: process.env.PANEL_HOST, path: 'categories' })
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly frontCategoriesService: FrontCategoriesService,
  ) {}

  /**
   * Retrieves a single category by its name
   * @param name - The unique name of the category to retrieve
   * @returns The category matching the provided name
   */
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.frontCategoriesService.findOne(name);
  }

  /**
   * Retrieves all available categories
   * @returns Array of all categories
   */
  @Get()
  findAll() {
    return this.frontCategoriesService.findAll();
  }

  /**
   * Creates a new category
   * @param createCategoryDto - The category data transfer object containing category details
   * @returns The newly created category
   * @throws ConflictException if category with the same name already exists
   */
  @Post()
  async create(@Body() createCategoryDto: Prisma.CategoryCreateInput) {
    return this.categoriesService.create(createCategoryDto);
  }
}
