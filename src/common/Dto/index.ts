import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

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
