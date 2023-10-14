import { useContext, useMemo } from 'react';
import { Stack, Grid, Button } from '@mui/material';
import { DialogContext, MuiTextField, Loading } from '@components';
import { useFormik } from 'formik';
import { CategoryFormFieldsType, CategoryFormFields } from './type';
import { initialCategoryFormValues, categoryFormValidationSchema } from './helpers';
import { getErrorMessage, isEmpty, Toastify } from '@shared';
import {
  useAddCategory,
  useUpdateCategory,
  useGetCategoryDetails,
  useGetAllCategories,
} from '@queries/Category';

type PropsType = {
  categoryId: string;
};

const CategoryForm = ({ categoryId }: PropsType) => {
  const isEdit = !isEmpty(categoryId);

  const { closeModal } = useContext(DialogContext);

  const { category, isFetching } = useGetCategoryDetails(categoryId, {
    onError: (error) => Toastify.error(error?.message),
  });

  const { handleInvalidateCategoryList } = useGetAllCategories();

  const { addCategory, isLoading: isAdding } = useAddCategory({
    onSuccess: () => {
      handleInvalidateCategoryList();
      Toastify.success('Added successfully!');
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const { updateCategory, isLoading: isUpdating } = useUpdateCategory({
    onSuccess: () => {
      handleInvalidateCategoryList();
      Toastify.success('Updated successfully!');
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleSubmitCategory = (formValues: CategoryFormFieldsType) => {
    const { categoryName, description } = formValues;
    isEdit
      ? updateCategory({ id: category?.id, body: { name: categoryName, description } })
      : addCategory({ name: categoryName, description });
  };

  const getInitialCategoryFormValues = useMemo((): CategoryFormFieldsType => {
    if (isEdit && category) {
      return { categoryName: category.name, description: category.description };
    }
    return { ...initialCategoryFormValues };
  }, [isEdit, category]);

  const { values, errors, touched, getFieldProps, handleSubmit } =
    useFormik<CategoryFormFieldsType>({
      initialValues: getInitialCategoryFormValues,
      validationSchema: categoryFormValidationSchema,
      onSubmit: () => {
        handleSubmitCategory(values);
      },
      enableReinitialize: true,
    });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const isSubmitting = isAdding || isUpdating;

  return isFetching ? (
    <Loading variant="primary" size="small" />
  ) : (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="Category name"
            placeholder="Category name"
            disabled={isSubmitting}
            errorMessage={getFieldErrorMessage(CategoryFormFields.CATEGORY_NAME)}
            {...getFieldProps(CategoryFormFields.CATEGORY_NAME)}
          />
        </Grid>
        <Grid item xs={12}>
          <MuiTextField
            fullWidth
            multiline
            size="small"
            label="Description"
            placeholder="Description"
            disabled={isSubmitting}
            errorMessage={getFieldErrorMessage(CategoryFormFields.DESCRIPTION)}
            {...getFieldProps(CategoryFormFields.DESCRIPTION)}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Button variant="outlined" color="inherit" disabled={isSubmitting} onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">
              {isEdit ? 'Save' : 'Add'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default CategoryForm;
