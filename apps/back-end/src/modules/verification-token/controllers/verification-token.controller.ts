import { Controller, Get, Param } from '@nestjs/common';
import { VerificationTokenService } from '../services/verification-token.service';

@Controller('verification-token')
export class VerificationTokenController {
  constructor(
    private readonly verificationTokenService: VerificationTokenService,
  ) {}

  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    return this.verificationTokenService.verify(token);
  }

  @Get('create')
  async create() {
    return this.verificationTokenService.create('649d471720233e2581d46322');
  }
}
