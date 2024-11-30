import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductsService as FrontProductsService } from 'src/modules/front/products/services/products.service';
import { CategoriesService } from '../categories/services/categories.service';
@Module({
  controllers: [ProductsController],
  providers: [PrismaService, ProductsService, FrontProductsService, CategoriesService],
})
export class ProductsModule {}
