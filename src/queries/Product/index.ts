import productApi from './productApi';
export * from './type';
export * from './useGetAllProduct';
export * from './useAddProduct';
export * from './useDeleteProduct';
export * from './useGetProductById';
export * from './useUpdateProduct';
export * from './useImportProduct';

// export crud queries

export const ProductApi = productApi.create();
