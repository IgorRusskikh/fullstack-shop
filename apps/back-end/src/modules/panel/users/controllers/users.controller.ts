import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService as FrontUserService } from 'src/modules/front/user/services/user.service';
import { UsersService } from '../services/users.service';
import { Prisma } from '@prisma/client';

@Controller({ host: process.env.PANEL_HOST, path: 'users' })
export class UsersController {
  constructor(
    private readonly frontUsersService: FrontUserService,
    private readonly usersService: UsersService,
  ) {}

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.frontUsersService.getOne(id);
  }

  @Get()
  async search(@Query('query') query: string) {
    console.log(query);

    if (!query) {
      return await this.usersService.findAll();
    }

    return await this.usersService.findMany({
      OR: [
        { username: { contains: query } },
        { email: { contains: query } },
        {
          phone: query,
        },
      ],
    });
  }

  @Post()
  async create(@Body() createUserDto: Prisma.UserCreateInput) {
    return await this.frontUsersService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return await this.frontUsersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.frontUsersService.delete(id);
  }
}
