import { ApiProperty } from '@nestjs/swagger';
import { USER_TYPE } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
// import { USER_TYPE } from '../enums';

export class ResponseDto<T> {
  @ApiProperty({ description: 'Name of user' })
  @IsNotEmpty()
  @IsInt()
  status: number;

  @ApiProperty({ description: 'Email of the user' })
  data: T;

  @ApiProperty({ description: 'Email of the user' })
  @IsNotEmpty()
  @IsString()
  message: string;
}

export class AccountDto {
  @ApiProperty({ description: 'ID of the user' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'type of user',
    default: USER_TYPE.LESS_PRIVILEGED_USER,
  })
  @IsNotEmpty()
  type: USER_TYPE;

  @ApiProperty({ description: 'password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'mobile number of the user' })
  @IsNotEmpty()
  @IsString()
  mobile_no: string;

  @ApiProperty({ description: 'verification state of the user' })
  @IsNotEmpty()
  @IsBoolean()
  verified: boolean;
}

export class CreateAccountDto {
  @ApiProperty({ description: 'email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'type of user',
    default: USER_TYPE.LESS_PRIVILEGED_USER,
  })
  @IsNotEmpty()
  type: USER_TYPE;

  @ApiProperty({ description: 'password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'state of the user' })
  @IsNotEmpty()
  @IsBoolean()
  online: boolean;

  @ApiProperty({ description: 'mobile number of the user' })
  @IsNotEmpty()
  @IsString()
  mobile_no: string;
}

export class AccountResponseDto {
  @ApiProperty({ description: 'ID of the user' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'state of the user' })
  @IsNotEmpty()
  @IsBoolean()
  online: boolean;

  @ApiProperty({ description: 'verification state of the user' })
  @IsNotEmpty()
  @IsBoolean()
  verified: boolean;

  @ApiProperty({ description: 'mobile number of the user' })
  @IsNotEmpty()
  @IsString()
  mobile_no: string;

  @ApiProperty({ description: 'Avatar of the user' })
  @IsNotEmpty()
  @IsString()
  avatar: string;

  // @ApiProperty({ description: 'type of user' })
  // @IsNotEmpty()
  // type: USER_TYPE;
}

export class accountLoginDto {
  @ApiProperty({ description: 'email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'type of user',
  })
  @IsNotEmpty()
  type: USER_TYPE;

  @ApiProperty({ description: 'password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AccountLoginResponseDto {
  @ApiProperty({ description: 'ID of the user' })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'state of the user' })
  @IsNotEmpty()
  @IsBoolean()
  online: boolean;

  @ApiProperty({ description: 'verification state of the user' })
  @IsNotEmpty()
  @IsBoolean()
  verified: boolean;

  @ApiProperty({ description: 'mobile number of the user' })
  @IsNotEmpty()
  @IsString()
  mobile_no: string;

  @ApiProperty({ description: 'jwt token' })
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class VerifyEmailDto {
  @ApiProperty({
    description: 'user type',
    enum: USER_TYPE,
  })
  @IsEnum(USER_TYPE)
  userType: USER_TYPE;

  @ApiProperty({ description: 'email verification token' })
  @IsNotEmpty()
  @IsString()
  token: string;
}
