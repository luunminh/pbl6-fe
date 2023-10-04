import { UserProfileType } from '@components';

export type UpdateProfilePayload = {
  email: string;
  firstName: string;
  lastName: string;
  gender: number | 1 | 0;
  address: string;
  phone: string;
};

export type ChangePasswordPayload = {
  tokenResetPassword: string;
  newPassword: string;
};

export type ProfileResponse = UserProfileType;
