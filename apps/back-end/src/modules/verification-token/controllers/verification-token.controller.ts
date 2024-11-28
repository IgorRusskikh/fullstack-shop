import { Controller, Get, Param } from '@nestjs/common';
import { EmailVerificationTokenService } from '../services/email-verification-token.service';

@Controller('verification-token')
export class VerificationTokenController {
  constructor(
    private readonly verificationTokenService: EmailVerificationTokenService,
  ) {}

  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    return this.verificationTokenService.verify(token);
  }
}
