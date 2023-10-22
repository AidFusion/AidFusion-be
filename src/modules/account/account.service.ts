import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Config/prisma.service';
import { Account, Prisma } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import { mapToAccount } from 'src/Utils';
import {
  AccountDto,
  AccountResponseDto,
  CreateAccountDto,
} from 'src/common/Dto';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async register(data: CreateAccountDto): Promise<AccountResponseDto> {
    const { email, password, name, type }: CreateAccountDto = data;
    if (!email || !password || !name || !type) {
      throw new BadRequestException('User data contains empty fields');
    }
    const _account: Account = await this.prisma.account.create({ data });
    if (_account) {
      return { ...mapToAccount(_account) };
    }
  }
}
