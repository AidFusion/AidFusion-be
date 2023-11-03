import { Account, Meals, USER_TYPE } from '@prisma/client';
import { AccountResponseDto } from 'src/common/Dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { tokenPayload } from 'src/common/Dto/jwt.interface';
import {
  donorLink,
  jwtSecret,
  lessPrivilegedUserLink,
  nodeEnv,
  restaurantOwnerLink,
} from 'src/Config/env';
import { Meal } from 'src/modules/meal/meal.interface';

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

  static mapToMeal = (data: Meals): Meals => {
    return {
      id: data.id,
      img: data.img,
      name: data.name,
      price: data.price,
    };
  };

  static generateToken(payload: tokenPayload): string {
    return jwt.sign(payload, jwtSecret);
  }

  static getVerificationUrl(
    userType: USER_TYPE,
    id: string,
    token: string,
  ): string {
    let baseUrl = 'http://localhost:3000';

    if (nodeEnv === 'staging' && userType === USER_TYPE.DONOR) {
      baseUrl = donorLink;
    } else if (
      nodeEnv === 'staging' &&
      userType === USER_TYPE.LESS_PRIVILEGED_USER
    ) {
      baseUrl = lessPrivilegedUserLink;
    } else if (
      nodeEnv === 'staging' &&
      userType === USER_TYPE.RESTAURANT_OWNER
    ) {
      baseUrl = restaurantOwnerLink;
    }

    switch (userType) {
      case USER_TYPE.DONOR:
        return `${baseUrl}/merchant/verification/${id}/${token}`;
      case USER_TYPE.LESS_PRIVILEGED_USER:
        return `${baseUrl}/client/verification/${id}/${token}`;
      case USER_TYPE.RESTAURANT_OWNER:
        return `${baseUrl}/client/verification/${id}/${token}`;
      default:
        return '';
    }
  }
}
