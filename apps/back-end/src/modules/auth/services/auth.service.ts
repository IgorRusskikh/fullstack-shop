import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { AccessTokensService } from 'src/common/services/access-tokens/access-tokens.service';
import { accessTokenPayloadDto } from 'src/common/services/dto/accessTokenPayloadDto';
import { refreshTokenPayloadDto } from 'src/common/services/dto/refreshTokenPayloadDto';
import { UserService } from 'src/modules/user/services/user.service';

/**
 * AuthService is a service that encapsulates the logic for registering
 * and validating users.
 *
 * @class AuthService
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokensService: AccessTokensService,
  ) {}

  /**
   * Registers a new user with the given `createUserDto` and returns an array
   * containing the access token and the refresh token.
   *
   * @param createUserDto The user data to be registered.
   * @returns An array containing the access token and the refresh token.
   */
  async register(createUserDto: Prisma.UserCreateInput): Promise<string[]> {
    const user = await this.userService.create(createUserDto);

    const accessTokenPayload: accessTokenPayloadDto = {
      userId: user.id,
    };
    const refreshTokenPayload: refreshTokenPayloadDto = {
      userId: user.id,
      tokenVersion: user.tokenVersion,
    };

    const accessToken =
      await this.tokensService.generateAccessToken(accessTokenPayload);
    const refreshToken =
      await this.tokensService.generateRefreshToken(refreshTokenPayload);

    await this.userService.patch(user.id, {
      refreshToken: refreshToken,
    });

    return [accessToken, refreshToken];
  }

  async logout(id: string) {
    const user = await this.userService.getOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    const a = await this.userService.patch(user.id, { refreshToken: '' });

    console.log(a);

    return true;
  }

  /**
   * Validates the user's phone number and password.
   *
   * @param phone - The user's phone number.
   * @param password - The user's password.
   * @returns An object containing the user's id, username, phone number, and
   *          token version if the credentials are valid. Returns null if the
   *          credentials are invalid.
   */
  async validateUser(
    phone: string,
    password: string,
  ): Promise<{
    id: string;
    username: string;
    phone: string;
    tokenVersion: number;
  }> {
    const user = await this.userService.findOneByPhone(phone);

    if (!user) {
      return null;
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      phone: user.phone,
      tokenVersion: user.tokenVersion,
    };
  }

  async refresh(userId: string) {
    const user = await this.userService.getOne(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const refreshTokenPayload = await this.tokensService.validateRefreshToken(
      user.refreshToken,
    );

    if (!refreshTokenPayload) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const accessTokenPayload: accessTokenPayloadDto = {
      userId,
    };

    const accessToken =
      await this.tokensService.generateAccessToken(accessTokenPayload);

    return accessToken;
  }
}
