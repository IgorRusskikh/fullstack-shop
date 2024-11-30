import { Controller, Get, Param } from '@nestjs/common';
import { EmailVerificationTokenService } from '../services/email-verification-token.service';

/**
 * Controller for handling email verification token operations
 */
@Controller({ host: process.env.API_HOST, path: 'verification-token' })
export class VerificationTokenController {
  constructor(
    private readonly verificationTokenService: EmailVerificationTokenService,
  ) {}

  /**
   * Verifies an email verification token
   * @param token - The verification token to validate
   * @returns The result of token verification
   */
  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    return this.verificationTokenService.verify(token);
  }
}
