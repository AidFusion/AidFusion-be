import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Config/prisma.service';
import { Account, Prisma, USER_TYPE } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import { utils } from 'src/Utils';
import {
  AccountLoginResponseDto,
  AccountResponseDto,
  CreateAccountDto,
  VerifyEmailDto,
  accountLoginDto,
} from 'src/common/Dto';
import { tokenPayload } from 'src/common/Dto/jwt.interface';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../notification/email/email.service';
import { IVerificationToken, ValidateTokenResponse } from '../auth/interface';

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  async register(data: CreateAccountDto): Promise<AccountResponseDto> {
    const { email, password, name, type }: CreateAccountDto = data;
    if (!email || !password || !name || !type) {
      throw new BadRequestException('User data contains empty fields');
    }

    const exists: Account = await this.prisma.account.findUnique({
      where: { email },
    });

    if (exists) {
      throw new BadRequestException(`Account with ${email} already exists!`);
    }

    data.password = await utils.hashString(password);
    const _account: Account = await this.prisma.account.create({
      data: {
        email: data.email,
        name: data.name,
        online: false,
        type: USER_TYPE[`${data.type}`],
        password: data.password,
        mobile_no: data.mobile_no,
      },
    });
    if (_account) {
      return { ...utils.mapToAccount(_account) };
    }
  }

  async login(data: accountLoginDto): Promise<AccountLoginResponseDto> {
    const { email, type, password } = data;
    if (!email || !type || !password) {
      throw new BadRequestException('User data contains empty fields');
    }
    const exists: Account = await this.prisma.account.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!exists) {
      throw new BadRequestException('Email not found');
    }
    const comparePassword = utils.compareHash(data.password, exists.password);
    if (!comparePassword) {
      throw new BadRequestException('Password Incorrect');
    }
    const _account: Account = await this.prisma.account.findFirst({
      where: {
        email: data.email,
        password: exists.password,
        type: data.type,
      },
    });
    const payload: tokenPayload = {
      id: _account.id,
      email: _account.email,
      verified: _account.verified,
      type: _account.type,
    };
    const token = utils.generateToken(payload);
    await this.prisma.account.update({
      where: { email: _account.email },
      data: { online: true },
    });
    return { ...utils.mapToAccount(_account), token };
  }

  async getUser(user: tokenPayload): Promise<AccountResponseDto> {
    const _account: Account = await this.prisma.account.findUnique({
      where: { email: user.email },
    });
    return { ...utils.mapToAccount(_account) };
  }

  sendVerificationEmail(data: tokenPayload): Promise<{ sendStatus: boolean }> {
    const { email, id, type } = data;
    const token = this.authService.generateVerificationToken({ email });

    const url: string = utils.getVerificationUrl(type, id, token);

    return this.emailService.sendVerificationEmail(email, url);
  }

  async verifyEmail(
    id: string,
    { token, userType }: VerifyEmailDto,
  ): Promise<AccountResponseDto> {
    const res: ValidateTokenResponse<IVerificationToken> =
      this.authService.validateVerificationToken(token);

    if (!res.isValid) {
      throw new BadRequestException(res.error);
    }

    const account = await this.prisma.account.findFirst({
      where: {
        id: id,
        email: res.jwt.email,
        type: userType,
      },
    });

    if (!account) {
      throw new BadRequestException(`User id ${id} not found!`); //come up with better error message
    }

    if (account.verified) {
      throw new ConflictException('Email already verified');
    }

    account.verified = true;

    const updated_account = await this.prisma.account.update({
      where: { id, email: res.jwt.email, type: userType }, data: {verified: true}
    });

    return {...utils.mapToAccount(updated_account)}
  }
  async logout(user: tokenPayload): Promise<string> {
    const _account: Account = await this.prisma.account.findUnique({
      where: { email: user.email },
    });
    await this.prisma.account.update({
      where: { email: _account.email },
      data: { online: false },
    });
    return 'User successfully logged out';
  }
}
