import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { DonationService } from './modules/donation/donation.service';
import { DonationModule } from './modules/donation/donation.module';
import { PrismaService } from './Config/prisma.service';
import { jwtSecret } from './Config/env';
import { JwtModule } from '@nestjs/jwt';
import { NotificationModule } from './modules/notification/notification.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AccountModule,
    DonationModule,
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '60s' },
    }),
    NotificationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DonationService, PrismaService],
})
export class AppModule {}
