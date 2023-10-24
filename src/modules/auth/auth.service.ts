import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtEmailSecret } from 'src/Config/env';
import { IVerificationToken, ValidateTokenResponse } from './interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateVerificationToken(data: IVerificationToken): string {
    try {
      const token: string = this.jwtService.sign(data, {
        expiresIn: 60,
        secret: jwtEmailSecret
      });

      return token;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  validateVerificationToken(
    token: string,
  ): ValidateTokenResponse<IVerificationToken> {
    try {
      const decodedToken: IVerificationToken = this.jwtService.verify(
        token,
        {
          secret: jwtEmailSecret,
        },
      );

      return {
        isValid: true,
        jwt: decodedToken,
      };
    } catch (error) {
      return {
        isValid: false,
        error: error.message,
      };
    }
  }
}
