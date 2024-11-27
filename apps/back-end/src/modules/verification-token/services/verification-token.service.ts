import {
  BadRequestException,
  HttpExceptionOptions,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/common/services/email/email.service';
import { UserService } from 'src/modules/user/services/user.service';
import { VerificationTokenDto } from '../dtos';

@Injectable()
export class VerificationTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  async create(userId: string): Promise<string> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const user = await this.userService.getOne(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.emailVerified) {
      throw new BadRequestException('User already verified');
    }

    const payload = { userId };

    const token = await this.jwtService.signAsync(payload);

    await this.userService.patch(userId, { verificationLink: token });

    this.emailService.sendVerificationToken(user.email, token);

    return token;
  }

  async verify(token: string): Promise<boolean | HttpExceptionOptions> {
    try {
      const payload =
        await this.jwtService.verifyAsync<VerificationTokenDto>(token);

      const user = await this.userService.patch(payload.userId, {
        emailVerified: Date.toString(),
        verificationLink: '',
      });

      if (!user) {
        throw new BadRequestException('Invalid token');
      }

      if (payload) return true;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Invalid token or token expired');
    }
  }
}