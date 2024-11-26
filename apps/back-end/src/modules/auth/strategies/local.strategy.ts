import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessTokensService } from 'src/common/services/access-tokens/access-tokens.service';
import { UserService } from 'src/modules/user/services/user.service';

/**
 * LocalStrategy is a Passport strategy for authenticating users using a phone
 * number and password. It uses the AuthService to validate the user credentials
 * and the AccessTokensService to generate access and refresh tokens upon successful
 * authentication. This strategy is marked with 'local' and expects 'phone' and 'password'
 * fields in the request.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: AccessTokensService,
    private readonly userService: UserService,
  ) {
    super({
      usernameField: 'phone',
      passwordField: 'password',
    });
  }

  /**
   * Validates the user's phone number and password.
   *
   * @param phone - The user's phone number.
   * @param password - The user's password.
   * @returns An object containing the username, phone number, token version,
   *          access token, and refresh token if the credentials are valid.
   * @throws UnauthorizedException if the credentials are invalid.
   */
  async validate(
    phone: string,
    password: string,
  ): Promise<{
    username: string;
    phone: string;
    accessToken: string;
  }> {
    const user = await this.authService.validateUser(phone, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { id, username, tokenVersion } = user;
    const accessTokenPayload = { userId: id };
    const refreshTokenPayload = { userId: id, tokenVersion };

    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens(
        accessTokenPayload,
        refreshTokenPayload,
      );

    await this.userService.patch(id, {
      refreshToken: refreshToken,
      tokenVersion: {
        increment: 1,
      },
    });

    return { username, phone, accessToken };
  }
}
