import { Account } from '@prisma/client';
import { AccountDto, AccountResponseDto } from 'src/common/Dto';

export const mapToAccount = (data: Account): AccountResponseDto => {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
  };
};
