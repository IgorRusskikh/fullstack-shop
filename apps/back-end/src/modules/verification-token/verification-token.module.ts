import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtCustomModule } from 'src/common/jwt/jwt.module';
import { EmailService } from 'src/common/services/email/email.service';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { UserService } from '../user/services/user.service';
import { VerificationTokenController } from './controllers/verification-token.controller';
import { EmailVerificationTokenService } from './services/email-verification-token.service';

@Module({
  imports: [ConfigModule, JwtCustomModule],
  controllers: [VerificationTokenController],
  providers: [
    ConfigService,
    EmailVerificationTokenService,
    PrismaService,
    UserService,
    EmailService,
  ],
})
export class VerificationTokenModule {}
