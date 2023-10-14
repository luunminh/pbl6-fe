import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UpdateCategoryPayload } from './type';
import { CategoryApi } from '.';
import { responseWrapper } from '@shared';

export function useUpdateCategory(options?: UseMutationOptions<any, Error, UpdateCategoryPayload>) {
  const handleUpdateCategory = ({ id, body }: UpdateCategoryPayload) =>
    responseWrapper(CategoryApi.updateCategory, [id, body]);

  const { mutate: updateCategory, isLoading } = useMutation<any, Error, UpdateCategoryPayload>({
    mutationFn: handleUpdateCategory,
    ...options,
  });

  return {
    updateCategory,
    isLoading,
  };
}
