import { TableParams } from '@components';

export interface CategoryResponse {
  id: string;
  name: string;
  description: string;
}

export type ProductResponse = {
  id: string;
  name: string;
  description: string;
  amount: number;
  price: number;
  category: CategoryResponse;
  createdAt: string;
  updatedAt: string;
};

export type ProductListParams = TableParams;

export type ProductPayload = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
};

export interface DeleteProductPayload {
  id: string;
}
