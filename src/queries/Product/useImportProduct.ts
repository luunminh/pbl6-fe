/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductApi, ImportPayload } from '@queries';
import { responseWrapper } from '@shared';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export function useImportProduct(options?: UseMutationOptions<any, Error, ImportPayload>) {
  const {
    mutate: onImportProduct,
    isLoading: isImporting,
    isSuccess,
    isError,
    error,
  } = useMutation<any, Error, ImportPayload>({
    mutationFn: (payload: ImportPayload) => responseWrapper(ProductApi.importProduct, [payload]),
    ...options,
  });

  return {
    onImportProduct,
    isImporting,
    isSuccess,
    isError,
    error,
  };
}
