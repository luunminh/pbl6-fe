import * as yup from 'yup';
import { AddStaffFormFieldsType } from './type';
import { getStartCase } from '@shared';
import { ROLE_ID, ROLE_NAME } from './type';
import { ERROR_MESSAGES } from '@shared/utils/message';

export const initialAddStaffFormValues: AddStaffFormFieldsType = {
  firstName: null,
  lastName: null,
  // role: '',
  gender: 1,
  phoneNumber: null,
  email: null,
  address: null,
};

export const addStaffFormValidationSchema = yup.object({
  firstName: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  lastName: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  // role: yup.string().oneOf(['Admin', 'Staff'], 'You must choose a role').required(ERROR_MESSAGES.FIELD_REQUIRED),
  gender: yup.boolean().required(ERROR_MESSAGES.FIELD_REQUIRED),
  phoneNumber: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  email: yup
    .string()
    .nullable()
    .email(ERROR_MESSAGES.INVALID_DATA)
    .required(ERROR_MESSAGES.FIELD_REQUIRED),
  address: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
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

export enum StaffToastMessage {
  ADD_SUCCESS = 'New staff has been added successfully.',
}
