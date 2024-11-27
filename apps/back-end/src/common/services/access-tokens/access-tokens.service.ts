import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { accessTokenPayloadDto } from '../dto/accessTokenPayloadDto';
import { refreshTokenPayloadDto } from '../dto/refreshTokenPayloadDto';

@Injectable()
export class AccessTokensService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: accessTokenPayloadDto): Promise<string> {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    return accessToken;
  }

  async generateRefreshToken(payload: refreshTokenPayloadDto): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return refreshToken;
  }

  async generateTokens(
    accessPayload: accessTokenPayloadDto,
    refreshPayload: refreshTokenPayloadDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.generateAccessToken(accessPayload);
    const refreshToken = await this.generateRefreshToken(refreshPayload);

    return { accessToken, refreshToken };
  }

  async validateAccessToken(token: string): Promise<accessTokenPayloadDto> {
    const payload = await this.jwtService.verifyAsync(token);

    return payload;
  }

  async validateRefreshToken(token: string): Promise<refreshTokenPayloadDto> {
    try {
      const payload = await this.jwtService.verifyAsync(token);

      return payload;
    } catch (error) {
      return null;
    }
  }
}