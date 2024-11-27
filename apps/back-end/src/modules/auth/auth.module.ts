import { Module } from '@nestjs/common';
import { JwtCustomModule } from 'src/common/jwt/jwt.module';
import { AccessTokensService } from 'src/common/services/access-tokens/access-tokens.service';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { UserService } from '../user/services/user.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from 'src/common/services/email/email.service';
import { VerificationTokenService } from '../verification-token/services/verification-token.service';

/**
 * Module for authentication and authorization.
 *
 * Provides an `AuthService` which handles
 * authentication of users. Currently, only
 * local authentication is supported.
 *
 * It also provides an `AuthController` which
 * handles authentication requests.
 *
 * The `localStrategy` is a passport strategy
 * which is used to verify the credentials of
 * a user. It uses the `UserService` to fetch
 * the user from the database.
 *
 * The `AccessTokensService` is used to manage
 * access tokens which are used to authenticate
 * the user. If the user is authenticated, the
 * `AccessTokensService` will return the access
 * token which is used to validate the user
 * on subsequent requests.
 */
@Module({
  imports: [JwtCustomModule, ConfigModule],
  controllers: [AuthController],
  providers: [
    AccessTokensService,
    PrismaService,
    AuthService,
    LocalStrategy,
    UserService,
    JwtStrategy,
    EmailService,
    VerificationTokenService
  ],
})
export class AuthModule {}
