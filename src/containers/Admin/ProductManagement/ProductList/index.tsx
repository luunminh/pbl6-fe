import {
  CustomTableFilterContainer,
  CustomTableSearch,
  DialogContext,
  DialogType,
  EmptyTable,
  Table,
} from '@components';
import { Button, Container, Stack, Typography } from '@mui/material';
import { GetPropertiesParams, StaffResponse, useDeleteProduct, useGetAllProduct } from '@queries';
import { Toastify } from '@shared';
import { MUIDataTableOptions } from 'mui-datatables';
import React, { useCallback, useContext, useMemo } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import ProductFilter from '../ProductFilter';
import ProductForm from '../ProductForm';
import { PRODUCT_FILTER_QUERY_KEY, ProductFilterFormValue, formValueKey } from '../helpers';
import { allColumns } from './allColumns';

const ProductManagement: React.FC = () => {
  const { openModal, setDialogContent } = useContext(DialogContext);

  const { products, totalRecords, setParams, isFetching, handleInvalidateAllProducts } =
    useGetAllProduct({
      onError: (error) => {
        Toastify.error(error?.message);
      },
    });

  const { onDeleteProduct } = useDeleteProduct({
    onSuccess() {
      handleInvalidateAllProducts();
    },
  });

  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const paramsUrl: ProductFilterFormValue = useMemo(() => {
    const categoryQuery = query.getAll(PRODUCT_FILTER_QUERY_KEY.Categories) || undefined;

    return {
      categories: categoryQuery,
    };
  }, [query]);

  const handleAdd = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Add New Product',
      data: <ProductForm />,
      maxWidth: 'md',
    });
    openModal();
  };

  const handleEdit = useCallback(
    (rowData: StaffResponse) => {
      setDialogContent({
        type: DialogType.CONTENT_DIALOG,
        title: 'Edit Product',
        data: <ProductForm isEditing productId={rowData.id} />,
        maxWidth: 'md',
      });
      openModal();
    },
    [openModal, setDialogContent],
  );

  const handleDelete = useCallback(
    (rowData: StaffResponse) => {
      onDeleteProduct({ id: rowData.id });
    },
    [onDeleteProduct],
  );

  const handleView = useCallback(
    (rowData: StaffResponse) => {
      setDialogContent({
        type: DialogType.CONTENT_DIALOG,
        title: 'Product Detail',
        data: <ProductForm isEditing productId={rowData.id} readonly />,
        maxWidth: 'md',
      });
      openModal();
    },
    [openModal, setDialogContent],
  );

  const handleGetUser = (params: GetPropertiesParams) => {
    setParams({ ...params });
  };

  const tableOptions: MUIDataTableOptions = useMemo(
    () => ({
      count: totalRecords,
      rowHover: totalRecords > 0,
      filter: false,
      search: false,
    }),
    [totalRecords],
  );

  const columns = useMemo(
    () => allColumns({ handleEdit, handleDelete, handleView }),
    [handleEdit, handleDelete, handleView],
  );

  return (
    <Container maxWidth="xl">
      <Stack sx={{ mb: 2, mt: 2 }}>
        <Typography variant="h3" fontWeight={600}>
          Product Management
        </Typography>
      </Stack>
      <Stack alignItems="center" justifyContent="space-between" flexDirection="row">
        <CustomTableSearch placeholder="Search product..." />
        <Stack justifyContent="flex-end" direction="row" flexGrow={1} alignItems="center" gap={2}>
          <Button variant="contained" color="primary" startIcon={<IoAdd />} onClick={handleAdd}>
            Add new Product
          </Button>
          <CustomTableFilterContainer filterParamsKeys={formValueKey}>
            <ProductFilter searchValues={paramsUrl} />
          </CustomTableFilterContainer>
        </Stack>
      </Stack>
      <Table
        title=""
        onAction={handleGetUser}
        isLoading={isFetching}
        data={products}
        tableOptions={tableOptions}
        columns={columns}
        emptyComponent={<EmptyTable />}
        additionalFilterParams={[PRODUCT_FILTER_QUERY_KEY.Categories]}
      />
    </Container>
  );
};

export default ProductManagement;
