import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');

        if (!secret) {
          throw new Error('JWT_SECRET must be defined');
        }
        return {
          secret,
          signOptions: { expiresIn: '5m' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class JwtCustomModule {}
