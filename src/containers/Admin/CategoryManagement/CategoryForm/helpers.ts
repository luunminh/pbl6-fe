import { CategoryFormFieldsType } from './type';
import * as yup from 'yup';
import { ERROR_MESSAGES } from '@shared/utils/message';

export const initialCategoryFormValues: CategoryFormFieldsType = {
  categoryName: '',
  description: '',
};

export const categoryFormValidationSchema = yup.object({
  categoryName: yup
    .string()
    .max(30, 'This field must be 30 characters or less')
    .required(ERROR_MESSAGES.FIELD_REQUIRED),
  description: yup.string().max(150, 'This field must be 150 characters or less'),
});
