import { ProductPayload } from '@queries';
import * as yup from 'yup';

export enum ProductErrorMessage {
  BLANK = 'This field cannot be blank.',
}

export enum ProductToastMessage {
  ADD_SUCCESS = 'New product has been added successfully.',
  UPDATE_SUCCESS = 'Product has been updated successfully.',
}

export const initialProduct: ProductPayload = {
  id: null,
  name: null,
  description: null,
  price: 0,
  categoryId: null,
};

export const ProductSchema = yup.object().shape({
  id: yup.string().required(ProductErrorMessage.BLANK).nullable(),
  name: yup.string().required(ProductErrorMessage.BLANK).nullable(),
  description: yup.string().required(ProductErrorMessage.BLANK).nullable(),
  price: yup.number().required(ProductErrorMessage.BLANK).nullable().min(1),
  categoryId: yup.string().required(ProductErrorMessage.BLANK).nullable(),
});

export enum PRODUCT_KEY {
  PRODUCT_ID = 'id',
  PRODUCT_NAME = 'name',
  DESCRIPTION = 'description',
  PRICE = 'price',
  CATEGORY_ID = 'categoryId',
  AMOUNT = 'amount',
}
