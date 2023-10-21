import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Config/prisma.service';
import { Prisma } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async register(
    data: Prisma.AccountCreateInput,
  ): Promise<Prisma.AccountCreateWithoutDonationInput> {
    const { email, password, name, type }: Prisma.AccountCreateInput = data;
    if (!email || !password || !name || !type) {
      throw new BadRequestException('User data contains empty fields');
    }
    const _account = this.prisma.account.create({ data });
    if (_account) {
      return _account;
    }
  }
}
