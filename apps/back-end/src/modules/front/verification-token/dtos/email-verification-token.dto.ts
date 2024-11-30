import { Role } from "src/common/enums/role.enum";

export class EmailVerificationTokenDto {
  userId: string;
  email: string;
  role: Role;
}
