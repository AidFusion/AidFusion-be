import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AuthService } from '../auth/auth.service'
import { PrismaService } from 'src/Config/prisma.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, PrismaService, AuthService]
})
export class AccountModule {}
