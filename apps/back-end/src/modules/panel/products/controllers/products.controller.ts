import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Prisma } from '@prisma/client';
import { ProductsService as FrontProductsService } from 'src/modules/front/products/services/products.service';

/**
 * Controller for managing products in the admin panel
 */
@Controller({ host: process.env.PANEL_HOST, path: 'products' })
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly frontProductsService: FrontProductsService,
  ) {}

  /**
   * Get all products
   * @returns List of all products
   */
  @Get()
  findAll() {
    return this.frontProductsService.findAll();
  }

  /**
   * Get a single product by slug
   * @param slug - The slug of the product to find
   * @returns The product with the specified slug
   */
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.frontProductsService.findBySlug(slug);
  }

  /**
   * Create a new product
   * @param productCreateDto - The product data to create
   * @returns The created product
   */
  @Post()
  create(@Body() productCreateDto: Prisma.ProductCreateInput) {
    return this.productsService.create(productCreateDto);
  }
}
