import React, { useMemo, useContext, useCallback } from 'react';
import { Container, Stack, Typography, Button } from '@mui/material';
import { CustomTableSearch, Table, EmptyTable, DialogContext, DialogType } from '@components';
import { MUIDataTableOptions } from 'mui-datatables';
import { allColumns } from './allColumns';
import { CategoryListParams, useGetAllCategories } from '@queries/Category';
import { RoleService, Toastify } from '@shared';
import { IoAdd } from 'react-icons/io5';
import CategoryForm from '../CategoryForm';
import { isEmpty } from '@shared';

const CategoryList: React.FC = () => {
  const { openModal, setDialogContent } = useContext(DialogContext);

  const handleOpenCategoryDialog = useCallback((categoryId = null) => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: `${!isEmpty(categoryId) ? 'Edit Category' : 'Add New Category'}`,
      data: <CategoryForm categoryId={categoryId} />,
      maxWidth: 'md',
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { categories, totalRecords, setParams, isFetching } = useGetAllCategories({
    onError: (error) => Toastify.error(error?.message),
  });

  const handleGetCategoryList = (params: CategoryListParams) => {
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
    () => allColumns({ handleOpenCategoryDialog }),
    [handleOpenCategoryDialog],
  );

  return (
    <Container maxWidth="xl">
      <Stack my={2}>
        <Typography variant="h3" fontWeight={600}>
          Category Management
        </Typography>
      </Stack>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <CustomTableSearch placeholder="Search category..." />
        {RoleService.isAdminRole() && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<IoAdd />}
            onClick={() => handleOpenCategoryDialog()}
          >
            Add new category
          </Button>
        )}
      </Stack>
      <Table
        data={categories}
        tableOptions={tableOptions}
        columns={columns}
        onAction={handleGetCategoryList}
        isLoading={isFetching}
        emptyComponent={<EmptyTable />}
      />
    </Container>
  );
};

export default CategoryList;
