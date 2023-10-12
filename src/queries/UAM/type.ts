import { UserProfileType } from '@components';

export type ForgotPasswordPayload = {
  email: string;
};

export type ChangePasswordPayload = {
  tokenResetPassword: string;
  newPassword: string;
};

export type SignInPayload = {
  username: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
};
