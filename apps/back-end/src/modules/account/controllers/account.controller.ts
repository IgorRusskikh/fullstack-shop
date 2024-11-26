import { Body, Controller, Delete, Patch, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AccountService } from '../services/account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /**
   * Authorizes a user using the given `authorizeAccountDto` and returns the user
   * data if the authorization is successful.
   *
   * @param authorizeAccountDto The user data to be authorized.
   * @returns The user data if the authorization is successful.
   */
  @Post('authorize')
  async login(@Body() authorizeAccountDto: Prisma.AccountCreateInput) {
    return this.accountService.authorize(authorizeAccountDto);
  }

  /**
   * Updates the user data associated with the given `accountId` using the given
   * `updateAccountDto` and returns the updated user data if the update is
   * successful.
   *
   * @param accountId The ID of the user to be updated.
   * @param updateAccountDto The user data to be updated.
   * @returns The updated user data if the update is successful.
   */
  @Put(':accountId')
  async update() {}

  /**
   * Partially updates the user data associated with the given `accountId` using
   * the provided data and returns the updated user data if the update is
   * successful.
   *
   * @param accountId The ID of the user to be partially updated.
   * @returns The updated user data if the update is successful.
   */
  @Patch(':accountId')
  async patch() {}

  /**
   * Deletes the user data associated with the given `accountId` and returns
   * nothing if the deletion is successful.
   *
   * @param accountId The ID of the user to be deleted.
   * @returns Nothing if the deletion is successful.
   */
  @Delete(':accountId')
  async delete() {}
}
