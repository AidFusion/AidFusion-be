export interface IVerificationToken {
  email: string
}

export interface ValidateTokenResponse<T> {
  isValid: boolean;
  jwt?: T;
  error?: string;
}
