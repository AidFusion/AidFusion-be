import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { USER_TYPE } from '../enums';

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

  @ApiProperty({ description: 'type of user', default: USER_TYPE.LESS_PRIVILEGED_USER })
  @IsNotEmpty()
  type: USER_TYPE;

  @ApiProperty({ description: 'password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;
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

  @ApiProperty({ description: 'type of user', default: USER_TYPE.LESS_PRIVILEGED_USER })
  @IsNotEmpty()
  type: USER_TYPE;

  @ApiProperty({ description: 'password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;
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

  // @ApiProperty({ description: 'type of user' })
  // @IsNotEmpty()
  // type: USER_TYPE;
}
