import { Account } from '@prisma/client';
import { AccountResponseDto } from 'src/common/Dto';
import * as bcrypt from 'bcrypt';

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
    };
  };
}
