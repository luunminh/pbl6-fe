import * as yup from 'yup';
import { AddStaffFormFieldsType } from './type';
import { getStartCase } from '@shared';
import { ROLE_ID, ROLE_NAME } from './type';

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
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  // role: yup.string().oneOf(['Admin', 'Staff'], 'You must choose a role').required('Required'),
  gender: yup.boolean().required('Required'),
  phoneNumber: yup.string().required('Required'),
  email: yup.string().email('Invalid email address').required('Required'),
  address: yup.string().required('Required'),
});

export const roleOptions = [
  {
    label: getStartCase(ROLE_NAME[ROLE_ID.ADMIN]),
    value: ROLE_ID.ADMIN,
  },
  {
    label: getStartCase(ROLE_NAME[ROLE_ID.STAFF]),
    value: ROLE_ID.STAFF,
  },
];
