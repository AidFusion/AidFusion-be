import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Config/prisma.service';
import { Account, Prisma, USER_TYPE } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import { utils } from 'src/Utils';
import { AccountResponseDto, CreateAccountDto } from 'src/common/Dto';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async register(data: CreateAccountDto): Promise<AccountResponseDto> {
    const { email, password, name, type }: CreateAccountDto = data;
    if (!email || !password || !name || !type) {
      throw new BadRequestException('User data contains empty fields');
    }

    const exists = this.prisma.account.findUnique({ where: { email } });

    if (exists) {
      throw new BadRequestException(`Account with ${email} already exists!`);
    }

    data.password = await utils.hashString(password);
    const _account: Account = await this.prisma.account.create({
      data: {
        email: data.email,
        name: data.name,
        online: true,
        type: USER_TYPE[`${data.type}`],
        password: data.password,
        verified: false,
        mobile_no: data.mobile_no,
      },
    });
    if (_account) {
      return { ...utils.mapToAccount(_account) };
    }
  }
}
