import { UseQueryOptions } from '@tanstack/react-query';

export enum ApiKey {
  USERS = '/users',
  PROFILE = 'users/profile',
  USERS_LIST = '/admin/users',
  PRODUCTS = '/admin/products',
  ADD_STAFF = '/admin/cashiers',
  AUTH = '/auth',
  CATEGORY = 'admin/category',
  IMAGE = 'admin/files',
  STORE = 'admin/stores',
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };
