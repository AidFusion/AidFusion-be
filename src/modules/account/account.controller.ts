import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    type: ResponseDto<any>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async getUser(@Request() req): Promise<ResponseDto<any>> {
    const account = await this.accountService.getUser(req);
    return {
      status: HttpStatus.OK,
      data: account,
      message: 'Success',
    };
  }
}
