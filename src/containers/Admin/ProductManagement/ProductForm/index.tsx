import {
  COLOR_CODE,
  DialogContext,
  MuiInput,
  MuiSelect,
  MuiTextField,
  SelectOption,
  Image,
} from '@components';
import {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  Box,
  Button,
  Stack,
} from '@mui/material';
import {
  ProductPayload,
  useAddNewProduct,
  useGetAllCategoryLazy,
  useGetAllProduct,
  useGetProductById,
  useUpdateProduct,
} from '@queries';
import { Toastify, getErrorMessage } from '@shared';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCT_KEY, ProductSchema, ProductToastMessage, initialProduct } from './helpers';
import toastify from '@shared/services/toastify';
import { PRODUCT_FORM_KEY, handleKeyDown } from '../helpers';
import ProductFormSkeleton from './ProductFormSkeleton';
import { IMAGES } from '@appConfig/images';
import UploadImage from '@components/UploadImage';

type Props = {
  productId?: string;
  isEditing?: boolean;
  readonly?: boolean;
};

const ProductForm: React.FC<Props> = ({ productId, isEditing, readonly }) => {
  const [imageUrl, setImageUrl] = useState<string>(null);

  const handleImageUrlChange = (newUrl: string) => {
    setImageUrl(newUrl);
  };

  const { productData, isLoadingProduct } = useGetProductById({
    onError: (error) => Toastify.error(error.message),
    id: productId,
  });

  const { handleInvalidateAllProducts } = useGetAllProduct();

  const { categoryOptions, setParams, loading, fetchNextPage, setInputSearch } =
    useGetAllCategoryLazy({
      onError: (error) => toastify.error(error.message),
    });

  useEffect(() => {
    setParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const INITIAL: ProductPayload = useMemo(() => {
    if (productData) {
      setImageUrl(productData.image);
      return {
        ...initialProduct,
        id: productData.id,
        categoryId: productData.category.id,
        description: productData.description,
        name: productData.name,
        price: productData.price,
      };
    }
    return { ...initialProduct };
  }, [productData]);

  const { closeModal } = useContext(DialogContext);

  const { onAddNewProduct, isLoading: isAdding } = useAddNewProduct({
    onSuccess: () => {
      handleInvalidateAllProducts();
      Toastify.success(ProductToastMessage.ADD_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const { onUpdateProduct, isUpdating } = useUpdateProduct({
    onSuccess: () => {
      handleInvalidateAllProducts();
      Toastify.success(ProductToastMessage.UPDATE_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleSearch = (_e: unknown, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason !== 'reset') {
      setInputSearch(value);
    }
  };

  const handleOnChange = (e: unknown, value: SelectOption, r: AutocompleteChangeReason) => {
    setFieldValue(PRODUCT_FORM_KEY.categoryId, value?.value || null);
  };

  const handleSubmitForm = (values: ProductPayload) => {
    const payload: ProductPayload = {
      ...values,
      price: Number(values.price),
      image: imageUrl,
    };
    isEditing ? onUpdateProduct(payload) : onAddNewProduct(payload);
  };

  const formik = useFormik<ProductPayload>({
    initialValues: INITIAL,
    validationSchema: ProductSchema,
    onSubmit: handleSubmitForm,
    enableReinitialize: true,
  });

  const { errors, touched, getFieldProps, handleSubmit, setFieldValue } = formik;

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  if (isLoadingProduct) return <ProductFormSkeleton />;

  return (
    <Stack margin="0 -24px -24px">
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: 550,
              overflow: 'hidden',
              overflowY: 'auto',
            }}
          >
            <Stack direction="row" justifyContent="space-evenly" padding="24px" gap={2}>
              <Stack
                padding="24px"
                gap={1}
                sx={{
                  border: `1px solid ${COLOR_CODE.GREY_300} `,
                  borderRadius: 2,
                  width: '100%',
                }}
              >
                <MuiTextField
                  required
                  label="Product Name"
                  errorMessage={getFieldErrorMessage(PRODUCT_KEY.PRODUCT_NAME)}
                  placeholder="Enter product name"
                  fullWidth
                  size="small"
                  readOnly={readonly}
                  {...getFieldProps(PRODUCT_KEY.PRODUCT_NAME)}
                />
                <MuiTextField
                  required
                  label="Description"
                  errorMessage={getFieldErrorMessage(PRODUCT_KEY.DESCRIPTION)}
                  placeholder="Enter description"
                  fullWidth
                  multiline
                  rows={5}
                  size="small"
                  readOnly={readonly}
                  {...getFieldProps(PRODUCT_KEY.DESCRIPTION)}
                  InputProps={{
                    inputProps: {
                      maxLength: 255,
                    },
                  }}
                />
                <MuiSelect
                  label="Select category"
                  placeholder="not found"
                  required
                  size="small"
                  defaultValue={productData?.category?.name ?? null}
                  {...getFieldProps(PRODUCT_FORM_KEY.categoryId)}
                  onChange={handleOnChange}
                  onInputChange={handleSearch}
                  options={categoryOptions}
                  onFetchNextPage={fetchNextPage}
                  allowLazyLoad
                  filterOptions={(x) => x}
                  isGetOptionOnChange
                  isLoading={loading}
                  readOnly={readonly}
                  onBlur={(event, value, reason) => {
                    if (!value) handleSearch(event, '', reason);
                  }}
                  noOptionsText={'not found'}
                  errorMessage={getFieldErrorMessage(PRODUCT_FORM_KEY.categoryId)}
                />
                {readonly && (
                  <MuiInput
                    required
                    label="Quantity"
                    fullWidth
                    size="small"
                    readOnly={readonly}
                    value={productData.amount}
                  />
                )}
                <MuiInput
                  required
                  label="Price"
                  errorMessage={getFieldErrorMessage(PRODUCT_KEY.PRICE)}
                  placeholder="Enter price"
                  fullWidth
                  size="small"
                  readOnly={readonly}
                  onKeyDown={handleKeyDown}
                  {...getFieldProps(PRODUCT_KEY.PRICE)}
                  InputProps={{
                    endAdornment: 'VND',
                  }}
                />
              </Stack>
              <Stack
                padding="24px"
                sx={{
                  border: `1px solid ${COLOR_CODE.GREY_300} `,
                  borderRadius: 2,
                  width: '100%',
                }}
              >
                {readonly ? (
                  <Image src={IMAGES.noImage} sx={{ height: '100%', objectFit: 'scale-down' }} />
                ) : (
                  <UploadImage
                    importTypeId={`product:${productData.id}`}
                    imageUrl={imageUrl}
                    handleImageUrlChange={handleImageUrlChange}
                  />
                )}
              </Stack>
            </Stack>
          </Box>
          {!readonly && (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                mt: 1,
                padding: '16px 24px 24px 24px',
                gap: 2,
                borderRadius: '0 0 16px 16px',
              }}
            >
              <Button
                variant="outlined"
                onClick={closeModal}
                disabled={isLoadingProduct || isAdding || isUpdating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoadingProduct || isAdding || isUpdating}
                variant="contained"
              >
                {isEditing ? 'Save' : 'Add'}
              </Button>
            </Stack>
          )}
        </Form>
      </FormikProvider>
    </Stack>
  );
};

export default ProductForm;
