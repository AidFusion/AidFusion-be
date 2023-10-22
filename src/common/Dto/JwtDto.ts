import { ApiProperty } from "@nestjs/swagger";
import { USER_TYPE } from "@prisma/client";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class tokenPayload {
  @ApiProperty({ description: 'id' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'verificarion status' })
  @IsBoolean()
  @IsNotEmpty()
  verified: boolean;

  @ApiProperty({ description: 'user type' })
  @IsNotEmpty()
  type: USER_TYPE;
}