import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UAMApi } from '.';
import { responseWrapper } from '@shared';

export function useRequestChangePassword(options?: UseMutationOptions<any, Error, any>) {
  const {
    mutate: requestChangePassword,
    isLoading,
    isSuccess,
  } = useMutation<any, Error, any>({
    mutationFn: (payload: any) => responseWrapper(UAMApi.requestChangePassword),
    ...options,
  });

  return {
    requestChangePassword,
    isLoading,
    isSuccess,
  };
}
