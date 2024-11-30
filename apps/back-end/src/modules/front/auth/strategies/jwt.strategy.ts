import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokensService } from 'src/common/services/access-tokens/access-tokens.service';

/**
 * JwtStrategy is a Passport strategy that verifies the user's JWT
 * access token. It extracts the access token from the request
 * cookies and verifies it with the secret key from the environment
 * variables.
 *
 * @class JwtStrategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  /**
   * Constructs a new instance of JwtStrategy.
   *
   * @param configService - Service to access application configuration.
   * @param tokensService - Service to handle operations related to access tokens.
   *
   * Initializes the Passport strategy configuration, extracting the JWT
   * from the request's cookies, setting the secret key, and enabling
   * request passing to the callback.
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly tokensService: AccessTokensService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['access-token'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  /**
   * Validates the user's JWT access token by extracting it from the request's
   * cookies and verifying it with the secret key from the environment
   * variables.
   *
   * @param req - The Express request object.
   *
   * @returns The user's data if the token is valid, otherwise throws an
   *          UnauthorizedException.
   */
  async validate(req: Request) {
    const accessToken = req.cookies['access-token'];
    const user = await this.tokensService.validateAccessToken(accessToken);

    if (!user) {
      throw new UnauthorizedException('Token is exprired');
    }

    return user;
  }
}
