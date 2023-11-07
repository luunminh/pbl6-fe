import { StoreFormFieldsType } from './type';
import * as yup from 'yup';
import { ERROR_MESSAGES } from '@shared/utils/message';

export const initialStoreFormValues: StoreFormFieldsType = {
  address: '',
};

export const storeFormValidationSchema = yup.object({
  address: yup
    .string()
    .max(100, 'This field must be 100 characters or less')
    .required(ERROR_MESSAGES.FIELD_REQUIRED),
});
