import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { PrismaService } from 'src/Config/prisma.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, PrismaService]
})
export class AccountModule {}
