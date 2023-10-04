import { ChangePasswordPayload } from './type';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UAMApi } from '.';
import { responseWrapper } from '@shared';

export function useChangePassword(options?: UseMutationOptions<any, Error, ChangePasswordPayload>) {
  const { mutate: changePassword, isLoading } = useMutation<any, Error, ChangePasswordPayload>({
    mutationFn: (payload: ChangePasswordPayload) =>
      responseWrapper(UAMApi.changePassword, [payload]),
    ...options,
  });

  return {
    changePassword,
    isLoading,
  };
}
