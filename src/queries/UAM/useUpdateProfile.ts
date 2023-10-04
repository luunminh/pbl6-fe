import { UpdateProfilePayload } from './type';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UAMApi } from '.';
import { responseWrapper } from '@shared';

export function useUpdateProfile(options?: UseMutationOptions<any, Error, UpdateProfilePayload>) {
  const { mutate: updateProfile, isLoading } = useMutation<any, Error, UpdateProfilePayload>({
    mutationFn: (payload: UpdateProfilePayload) => responseWrapper(UAMApi.updateProfile, [payload]),
    ...options,
  });

  return {
    updateProfile,
    isLoading,
  };
}
