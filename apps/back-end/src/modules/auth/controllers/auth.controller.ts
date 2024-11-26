import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { accessTokenCookie } from 'src/constants/cookie.constant';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { ReqUserDto } from '../dto/req-user.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user with the given `createUserDto` and returns an array
   * containing the access token and the refresh token. The access token and
   * refresh token are also set as cookies in the response.
   *
   * @param createUserDto The user data to be registered.
   * @returns An array containing the access token and the refresh token.
   */
  @Post('register')
  async register(
    @Res({ passthrough: true }) response: Response,
    @Body() createUserDto: Prisma.UserCreateInput,
  ) {
    const [accessToken, refreshToken] =
      await this.authService.register(createUserDto);

    response.cookie('access-token', accessToken, accessTokenCookie);

    return { accessToken, refreshToken };
  }

  /**
   * Authenticates a user using the LocalAuthGuard and returns user details
   * along with setting access and refresh tokens as cookies in the response.
   *
   * @param request - The incoming request containing user information.
   * @param response - The response object to set cookies.
   * @returns An object containing the username and phone number.
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ReqUserDto> {
    const { userId, accessToken, username, phone } = req.user as ReqUserDto;

    res.cookie('access-token', accessToken, accessTokenCookie);

    return { userId, username, phone };
  }

  @Get('logout')
  @UseGuards(JwtGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('access-token');

    // console.log('req.user', req.user);

    await this.authService.logout((req.user as ReqUserDto).userId);

    res.status(200).json({ message: 'Logout successful' });
  }
}
