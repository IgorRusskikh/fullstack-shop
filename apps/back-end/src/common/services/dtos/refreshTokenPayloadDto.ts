import { Role } from 'src/common/enums/role.enum';

export class refreshTokenPayloadDto {
  userId: string;
  tokenVersion: number;
  // roles: Role[];
}
