import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { VerificationTokenModule } from './verification-token/verification-token.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AccountModule,
    AuthModule,
    UserModule,
    CategoriesModule,
    ProductsModule,
    VerificationTokenModule,
  ],
})
export class FrontModule {}
