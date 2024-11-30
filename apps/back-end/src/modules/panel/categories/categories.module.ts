import { PrismaService } from './../../../common/services/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { CategoriesService as FrontCategoriesService } from 'src/modules/front/categories/services/categories.service';

/**
 * Module for managing categories in the admin panel.
 * Provides controllers and services for category operations.
 */
@Module({
  controllers: [CategoriesController],
  providers: [FrontCategoriesService, PrismaService, CategoriesService],
})
export class CategoriesModule {}
