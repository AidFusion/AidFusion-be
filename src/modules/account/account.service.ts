import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Config/prisma.service';
import { Account, Prisma, USER_TYPE } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import { utils } from 'src/Utils';
import {
  AccountLoginResponseDto,
  AccountResponseDto,
  CreateAccountDto,
  accountLoginDto,
} from 'src/common/Dto';
import { tokenPayload } from 'src/common/Dto/JwtDto';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

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
