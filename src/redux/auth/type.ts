import { UserProfileType, UserRole } from '@components';
import { boolean } from 'yup';

export interface IAuthState {
  isAuthenticated?: boolean;
  user: UserProfileType;
  currentRole: UserRole;

  isLoggingOut: boolean;
}

export const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
  currentRole: null,
  isLoggingOut: false,
};
