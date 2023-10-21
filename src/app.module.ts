import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { DonationService } from './modules/donation/donation.service';
import { DonationModule } from './modules/donation/donation.module';
import { PrismaService } from './Config/prisma.service';

@Module({
  imports: [AccountModule, DonationModule],
  controllers: [AppController],
  providers: [AppService, DonationService, PrismaService],
})
export class AppModule {}
