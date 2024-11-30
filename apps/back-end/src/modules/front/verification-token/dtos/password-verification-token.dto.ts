import { Role } from "src/common/enums/role.enum";

export class PasswordVerificationTokenDto {
  userId: string;
  email: string;
  role: Role;
}
