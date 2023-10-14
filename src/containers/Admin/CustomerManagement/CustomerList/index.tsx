import { CustomTableSearch, EmptyTable, Table } from '@components';
import { Container, Stack, Typography } from '@mui/material';
import { Toastify } from '@shared';
import { MUIDataTableOptions } from 'mui-datatables';
import React, { useMemo } from 'react';
import { GetPropertiesParams, ROLE_ID, useGetAllStaff } from 'src/queries';
import { USER_FILTER_QUERY_KEY } from '../../StaffManagement/StaffList/helpers';
import { allColumns } from './allColumns';

const CustomerList: React.FC = () => {
  const { staffs, totalRecords, setParams, isFetching } = useGetAllStaff({
    onError: (error) => {
      Toastify.error(error?.message);
    },
  });

  const handleGetUser = (params: GetPropertiesParams) => {
    if (!Array.isArray(params.roles) || params.roles.length === 0) {
      params.roles = [ROLE_ID._USER.toString()];
    }
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

  const columns = useMemo(() => allColumns(), []);

  return (
    <Container maxWidth="xl">
      <Stack sx={{ mb: 2, mt: 2 }}>
        <Typography variant="h3" fontWeight={600}>
          Customer Management
        </Typography>
      </Stack>
      <Stack alignItems="center" justifyContent="space-between" flexDirection="row">
        <CustomTableSearch placeholder="Search customer..." />
      </Stack>
      <Table
        title=""
        onAction={handleGetUser}
        isLoading={isFetching}
        data={staffs}
        tableOptions={tableOptions}
        columns={columns}
        additionalFilterParams={[USER_FILTER_QUERY_KEY._USER_ROLE, USER_FILTER_QUERY_KEY._STATUS]}
        emptyComponent={<EmptyTable />}
      />
    </Container>
  );
};

export default CustomerList;
