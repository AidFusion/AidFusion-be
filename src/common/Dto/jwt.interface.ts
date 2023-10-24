import { USER_TYPE } from '@prisma/client';

export interface tokenPayload {
  id: string;

  email: string;

  verified: boolean;

  type: USER_TYPE;
}
