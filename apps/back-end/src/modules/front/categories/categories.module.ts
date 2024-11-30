import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Module({
  controllers: [CategoriesController],
  providers: [PrismaService, CategoriesService],
})
export class CategoriesModule {}
