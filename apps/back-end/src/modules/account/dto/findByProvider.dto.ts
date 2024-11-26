import { Account } from '@prisma/client';

export class FindByProviderDto {
  account: Account;
  user?: {
    username: string;
    image: string | null;
  };
}
