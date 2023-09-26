import { UseQueryOptions } from '@tanstack/react-query';

export enum ApiKey {
  USER_MANAGEMENT = '/user/profile',
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };
