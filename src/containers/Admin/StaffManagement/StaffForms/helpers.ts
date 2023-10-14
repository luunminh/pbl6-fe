import * as yup from 'yup';
import { AddStaffFormFieldsType } from './type';
import { getStartCase } from '@shared';
import { ROLE_ID, ROLE_NAME } from './type';
import { ERROR_MESSAGES } from '@shared/utils/message';

export const initialAddStaffFormValues: AddStaffFormFieldsType = {
  firstName: '',
  lastName: '',
  // role: '',
  gender: 1,
  phoneNumber: '',
  email: '',
  address: '',
};

export const addStaffFormValidationSchema = yup.object({
  firstName: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED),
  lastName: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED),
  // role: yup.string().oneOf(['Admin', 'Staff'], 'You must choose a role').required(ERROR_MESSAGES.FIELD_REQUIRED),
  gender: yup.boolean().required(ERROR_MESSAGES.FIELD_REQUIRED),
  phoneNumber: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED),
  email: yup.string().email(ERROR_MESSAGES.INVALID_DATA).required(ERROR_MESSAGES.FIELD_REQUIRED),
  address: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED),
});

export const roleOptions = [
  {
    label: getStartCase(ROLE_NAME[ROLE_ID.ADMIN]),
    value: getStartCase(ROLE_NAME[ROLE_ID.ADMIN]),
  },
  {
    label: getStartCase(ROLE_NAME[ROLE_ID.STAFF]),
    value: getStartCase(ROLE_NAME[ROLE_ID.STAFF]),
  },
];
