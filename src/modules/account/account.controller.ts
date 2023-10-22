import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import {
  AccountLoginResponseDto,
  AccountResponseDto,
  CreateAccountDto,
  ResponseDto,
  accountLoginDto,
} from 'src/common/Dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @ApiOperation({ description: 'Create new account' })
  @Post('/register')
  async register(
    @Body() data: CreateAccountDto,
  ): Promise<ResponseDto<AccountResponseDto>> {
    const account = await this.accountService.register(data);
    return {
      status: HttpStatus.OK,
      data: account,
      message: 'Successfully created new user',
    };
  }

  @Post('/login')
  async login(
    @Body() data: accountLoginDto,
  ): Promise<ResponseDto<AccountLoginResponseDto>> {
    const account = await this.accountService.login(data);
    return {
      status: HttpStatus.OK,
      data: account,
      message: 'Logged in',
    };
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async getUser(@Request() req): Promise<ResponseDto<any>> {
    const account = await this.accountService.getUser(req);
    return {
      status: HttpStatus.OK,
      data: account,
      message: 'Success',
    };
  }
}
