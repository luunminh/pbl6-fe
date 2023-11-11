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
  image: string;
  price: number;
  category: CategoryResponse;
  createdAt: string;
  updatedAt: string;
};

export type ProductListParams = TableParams;

export type ProductPayload = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  categoryId: string;
};

export interface DeleteProductPayload {
  id: string;
}

export enum ExportType {
  CSV = 'CSV',
  EXCEL = 'EXCEL',
  PDF = 'PDF',
}

export interface ExportFileParams {
  id: string;
  exportType: ExportType;
}

export interface ImportDetail {
  productStoreId: string;
  amount: number;
  pricePerProduct: number;
}

export interface ImportPayload {
  importOrderDetails: ImportDetail[];
}
