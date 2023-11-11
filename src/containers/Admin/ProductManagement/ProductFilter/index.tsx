import { COLOR_CODE, MuiMultiSelect, SelectOption, TableQueryParams } from '@components';
import {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useGetAllCategoryLazy } from '@queries/Category/useGetAllCategoryLazy';
import { getErrorMessage, isEmpty } from '@shared';
import toastify from '@shared/services/toastify';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PRODUCT_FILTER_QUERY_KEY, ProductFilterFormValue } from '../helpers';

const ProductFilter: React.FC<Props> = ({ searchValues, handleClosePopup }) => {
  const { categoryOptions, setParams, loading, fetchNextPage, setInputSearch } =
    useGetAllCategoryLazy({
      onError: (error) => toastify.error(error.message),
    });

  console.log('categoryOptions', categoryOptions);
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    setParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const handleSubmitSearchAndFilter = (values: ProductFilterFormValue) => {
    const { categories } = values;

    query.delete(TableQueryParams._PAGE);
    if (!isEmpty(categories)) {
      query.delete(PRODUCT_FILTER_QUERY_KEY.Categories);
      categories.forEach((item) => {
        query.append(PRODUCT_FILTER_QUERY_KEY.Categories, item.toString());
      });
    } else {
      query.delete(PRODUCT_FILTER_QUERY_KEY.Categories);
    }
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const handleClearAll = () => {
    setValues({
      categories: null,
    });
    query.delete(PRODUCT_FILTER_QUERY_KEY.Categories);
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const initialValue: ProductFilterFormValue = useMemo(
    () => ({
      categories: searchValues.categories || [],
    }),
    [searchValues],
  );

  const formik = useFormik<ProductFilterFormValue>({
    initialValues: initialValue,
    onSubmit: handleSubmitSearchAndFilter,
  });
  const { setValues, handleSubmit, getFieldProps, setFieldValue, touched, errors } = formik;

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const handleSearch = (_e: unknown, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason !== 'reset') {
      setInputSearch(value);
    }
  };

  const handleOnChange = (e: unknown, value: SelectOption[], r: AutocompleteChangeReason) => {
    setFieldValue(PRODUCT_FILTER_QUERY_KEY.Categories, value.map((v) => v.value) || null);
  };

  return (
    <Container maxWidth="xs" sx={{ p: 2 }}>
      <Stack direction="row" alignItems="flex-end" mb={2} justifyContent="space-between">
        <Typography variant="h3" mr={3} color={COLOR_CODE.GREY_900} fontWeight="bold">
          Filters
        </Typography>
      </Stack>

      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MuiMultiSelect
                label="Select category"
                placeholder="..."
                required
                size="small"
                {...getFieldProps(PRODUCT_FILTER_QUERY_KEY.Categories)}
                onChange={handleOnChange}
                onInputChange={handleSearch}
                options={categoryOptions}
                onFetchNextPage={fetchNextPage}
                allowLazyLoad
                filterOptions={(x) => x}
                isGetOptionOnChange
                isLoading={loading}
                onBlur={(event, value, reason) => {
                  if (!value) handleSearch(event, '', reason);
                }}
                noOptionsText={'not found'}
                errorMessage={getFieldErrorMessage(PRODUCT_FILTER_QUERY_KEY.Categories)}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClearAll}>
                Reset
              </Button>

              <Button type="submit" variant="contained" color="primary">
                Apply Filter
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Container>
  );
};

type Props = {
  searchValues: ProductFilterFormValue;
  handleClosePopup?: (..._args: any[]) => void;
};

export default ProductFilter;
