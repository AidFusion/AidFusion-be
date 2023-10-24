import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import {
  AccountLoginResponseDto,
  AccountResponseDto,
  CreateAccountDto,
  ResponseDto,
  VerifyEmailDto,
  accountLoginDto,
} from 'src/common/Dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register new Users' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: ResponseDto<AccountResponseDto>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
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
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: ResponseDto<AccountLoginResponseDto>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
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
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: ResponseDto<AccountResponseDto>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async getUser(@Request() req): Promise<ResponseDto<AccountResponseDto>> {
    const account = await this.accountService.getUser(req.user);
    return {
      status: HttpStatus.OK,
      data: account,
      message: 'Success',
    };
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Success',
    type: ResponseDto<boolean>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @UseGuards(AuthGuard)
  @Post('/send-verify')
  async sendVerificationEmail(@Request() req): Promise<ResponseDto<boolean>> {
    const { sendStatus }: any = await this.accountService.sendVerificationEmail(
      req.user,
    );
    return {
      status: HttpStatus.OK,
      data: sendStatus,
      message: 'Success',
    };
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Success',
    type: ResponseDto<AccountResponseDto>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @ApiOperation({ description: 'email verification endpoint' })
  @Post('/:id/verify')
  async verifyEmail(
    @Body() data: VerifyEmailDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<AccountResponseDto>> {
    const response = await this.accountService.verifyEmail(id, data);

    return {
      status: HttpStatus.OK,
      data: response,
      message: 'Email verified successfully!',
    };
  }

  @UseGuards(AuthGuard)
  @Get('/logout')
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: ResponseDto<string>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async logout(@Request() req): Promise<ResponseDto<string>> {
    const message = await this.accountService.logout(req.user);
    return {
      status: HttpStatus.OK,
      data: message,
      message: 'Success',
    };
  }
}
