import { UseQueryOptions } from '@tanstack/react-query';

export enum ApiKey {
  USERS = '/users',
  PROFILE = 'users/profile',
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };
