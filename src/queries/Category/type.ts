import { TableParams } from '@components/common/Table';

export type CategoryListParams = TableParams;

export type CountType = {
  products: number;
};

export type ProductsType = {
  id: string;
  name: string;
  description: string;
  amount: number;
  price: number;
  createdAt: string;
};

export interface CategoryListResponse {
  id: string;
  name: string;
  description: string;
  _count: CountType;
  createdAt: string;
}

export interface CategoryDetailsResponse {
  id: string;
  name: string;
  description: string;
  products: ProductsType[];
  createdAt: string;
}

export type CategoryPayload = {
  name: string;
  description: string;
};

export type UpdateCategoryPayload = {
  id: string;
  body: CategoryPayload;
};
