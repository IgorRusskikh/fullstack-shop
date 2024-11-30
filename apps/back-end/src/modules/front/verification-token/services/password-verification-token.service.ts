import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/modules/front/user/services/user.service';
import { PasswordVerificationTokenDto } from '../dtos/password-verification-token.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class PasswordVerificationTokenService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(userId: string): Promise<string> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const user = await this.userService.getOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const payload: PasswordVerificationTokenDto = {
      userId,
      email: user.email,
      role: Role.USER,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    return token;
  }

  async verify(token: string): Promise<PasswordVerificationTokenDto> {
    try {
      const payload = await this.jwtService.verifyAsync(token);

      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
