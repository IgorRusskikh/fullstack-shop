import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from '../services/user.service';

@Controller({ host: process.env.API_HOST, path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* TODO: delete useless routes for users  */
  @Get('get-all')
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.userService.getOne(id);
  }

  @Post('')
  async create(@Body() createUserData: Prisma.UserCreateInput) {
    return await this.userService.create(createUserData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    updateUserData: Prisma.UserUpdateInput,
  ) {
    return this.userService.update(id, updateUserData);
  }

  @Patch(':id')
  async patch() {
    return 'patch';
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
