import * as yup from 'yup';
export const getShortName = ({ firstName = '', lastName = '' }) => {
  return `${firstName[0]}${lastName[0]}`;
};

export enum ChangePasswordFormField {
  CURRENT_PASS = 'currentPassword',
  NEW_PASS = 'newPassword',
}

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().nullable().required().min(6),
  newPassword: yup.string().nullable().required().min(6),
});

export type ChangePasswordFormType = {
  [ChangePasswordFormField.CURRENT_PASS]: string;
  [ChangePasswordFormField.NEW_PASS]: string;
};

export const initialChangePasswordFormValue: ChangePasswordFormType = {
  currentPassword: '',
  newPassword: '',
};
