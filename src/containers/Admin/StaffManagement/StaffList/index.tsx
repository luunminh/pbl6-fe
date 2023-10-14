import React, { useCallback, useMemo, useContext } from 'react';
import { CustomTableFilterContainer, CustomTableSearch, EmptyTable, Table } from '@components';
import { Button, Container, Stack, Typography } from '@mui/material';
import { Toastify } from '@shared';
import { MUIDataTableOptions } from 'mui-datatables';
import { useLocation } from 'react-router-dom';
import { GetPropertiesParams, ROLE_ID, useGetAllStaff } from 'src/queries';
import StaffFilter from '../StaffFilter';
import { allColumns } from './allColumns';
import { FormValue, USER_FILTER_QUERY_KEY, formValueKey } from './helpers';
import { IoAdd } from 'react-icons/io5';
import { DialogContext, DialogType } from '@components';
import NewStaffForm from '../StaffForms/NewStaffForm';
import StatusStaffForm from '../StaffForms/StatusStaffForm';

const StaffList: React.FC = () => {
  const { openModal, closeModal, setDialogContent } = useContext(DialogContext);

  const handleOpenDialogAdd = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Add New Staff',
      data: <NewStaffForm />,
      maxWidth: 'md',
    });
    openModal();
  };

  const handleChangeStaffStatus = useCallback(
    (isDeactivate: boolean) => {
      setDialogContent({
        type: DialogType.YESNO_DIALOG,
        title: 'Deactivate Staff',
        hideTitle: true,
        data: <StatusStaffForm isDeactivate={isDeactivate} />,
        isWarning: isDeactivate,
        okText: 'Yes',
        cancelText: 'Cancel',
        onOk: closeModal,
        onCancel: closeModal,
        maxWidth: 'xs',
      });
      openModal();
    },
    [closeModal, openModal, setDialogContent],
  );

  const { staffs, totalRecords, setParams, isFetching } = useGetAllStaff({
    onError: (error) => {
      Toastify.error(error?.message);
      console.log('error', error);
    },
  });

  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const paramsUrl: FormValue = useMemo(() => {
    const userRoleQuery = query.getAll(USER_FILTER_QUERY_KEY._USER_ROLE) || undefined;
    const statusQuery = query.get(USER_FILTER_QUERY_KEY._STATUS) || undefined;

    return {
      roles: userRoleQuery.map(Number),
      active: statusQuery,
    };
  }, [query]);

  const handleGetUser = (params: GetPropertiesParams) => {
    if (!Array.isArray(params.roles) || params.roles.length === 0) {
      params.roles = [ROLE_ID._ADMIN.toString(), ROLE_ID._STAFF.toString()];
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

  const columns = useMemo(
    () => allColumns({ onOpenStaffStatus: handleChangeStaffStatus }),
    [handleChangeStaffStatus],
  );

  return (
    <Container maxWidth="xl">
      <Stack sx={{ mb: 2, mt: 2 }}>
        <Typography variant="h3" fontWeight={600}>
          Staff Management
        </Typography>
      </Stack>
      <Stack alignItems="center" justifyContent="space-between" flexDirection="row">
        <CustomTableSearch placeholder="Search staff..." />
        <Stack justifyContent="flex-end" direction="row" flexGrow={1} alignItems="center" gap={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<IoAdd />}
            onClick={handleOpenDialogAdd}
          >
            Add new staff
          </Button>
          <CustomTableFilterContainer filterParamsKeys={formValueKey}>
            <StaffFilter searchValues={paramsUrl} />
          </CustomTableFilterContainer>
        </Stack>
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

export default StaffList;
