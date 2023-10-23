import { Account, USER_TYPE } from '@prisma/client';
import { AccountResponseDto } from 'src/common/Dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { tokenPayload } from 'src/common/Dto/JwtDto';
import { jwtSecret } from 'src/Config/env';

export class utils {
  static async hashString(a: string): Promise<string> {
    return await bcrypt.hash(a, 10);
  }

  static async compareHash(unhashed: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(unhashed, hashed);
  }

  static mapToAccount = (data: Account): AccountResponseDto => {
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      online: data.online,
      mobile_no: data.mobile_no,
      verified: data.verified,
      avatar: data.avatar,
    };
  };

  static generateToken(payload: tokenPayload): string {
    return jwt.sign(payload, jwtSecret);
  }
}
