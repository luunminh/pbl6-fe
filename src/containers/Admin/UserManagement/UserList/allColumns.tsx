/* eslint-disable no-unused-vars */
import { COLOR_CODE } from '@components';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { IoLockClosed, IoLockOpen } from 'react-icons/io5';
import { GENDER_NAME, StaffResponse } from 'src/queries';
import { customRoleRender, customStatusRender } from './helpers';

type ColumnProps = {
  handleDeactivate: (..._args: any[]) => void;
};

export const allColumns = ({ handleDeactivate }: ColumnProps): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: 'userRoles',
      label: 'Role',
      options: {
        filter: false,
        sort: false,
        customBodyRender: customRoleRender,
      },
    },
    {
      name: 'firstName',
      label: 'First Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => value ?? '--',
      },
    },
    {
      name: 'lastName',
      label: 'Last Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => value ?? '--',
      },
    },
    {
      name: 'gender',
      label: 'Gender',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => GENDER_NAME[value] ?? '--',
      },
    },
    {
      name: 'phone',
      label: 'Phone',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => value ?? '--',
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => value ?? '--',
      },
    },
    {
      name: 'deleteAt',
      label: 'Status',
      options: {
        filter: false,
        sort: false,
        customBodyRender: customStatusRender,
      },
    },
    {
      name: '',
      label: 'Actions',
      setCellProps: () => ({
        style: {},
      }),
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({
          style: { width: '80px', padding: '4px' },
        }),
        customBodyRender: (
          _value: string,
          meta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: StaffResponse[] }),
        ) => {
          const { tableData, rowIndex } = meta;
          const rowData = tableData.at(rowIndex) as StaffResponse;
          return (
            <Stack flexDirection="row">
              <Tooltip title={rowData.deleteAt ? 'Unlock' : 'Lock'} arrow placement="top">
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeactivate(rowData);
                  }}
                  sx={{
                    '.MuiIconButton-root': {
                      width: '30px',
                      height: '30px',
                    },
                    '&:hover': {
                      bgcolor: COLOR_CODE.WHITE,
                      boxShadow:
                        '0px 0px 2px 0px rgba(0, 0, 0, 0.10), 0px 2px 4px 0px rgba(0, 0, 0, 0.05)',
                      borderRadius: '4px',
                    },
                  }}
                >
                  {rowData.deleteAt ? (
                    <IoLockOpen color={COLOR_CODE.GREY_600} size={20} />
                  ) : (
                    <IoLockClosed color={COLOR_CODE.GREY_600} size={20} />
                  )}
                </IconButton>
              </Tooltip>
            </Stack>
          );
        },
      },
    },
  ];

  return columns;
};
