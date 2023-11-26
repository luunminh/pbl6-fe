import { COLOR_CODE } from '@components';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { IoLockClosed, IoLockOpen } from 'react-icons/io5';
import { formatDate, formatTextEllipsisStyles, formatValueOrNull } from '@shared';
import { GetVouchersResponse, VoucherStatus } from '@queries';
import { ActionButton } from './components';
import { renderVoucherStatus } from './helpers';

const defaultOptions = {
  filter: false,
  sort: false,
};

export enum VouchersParamsKey {
  CODE = 'code',
  DESCRIPTION = 'description',
  QUANTITY = 'quantity',
  START_DATE = 'startDate',
  EXP_DATE = 'endDate',
  STATUS = 'status',
  ACTION = 'action',
}

export const allColumns = (): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: VouchersParamsKey.CODE,
      label: 'Voucher Code',
      options: {
        ...defaultOptions,
        customBodyRender: (value) => {
          return value ?? '--';
        },
      },
    },
    {
      name: VouchersParamsKey.DESCRIPTION,
      label: 'Description',
      options: {
        ...defaultOptions,
        customBodyRender: (value: string) => (
          <Tooltip title={value} arrow>
            <Typography sx={formatTextEllipsisStyles(1)}>{value ?? '--'}</Typography>
          </Tooltip>
        ),
      },
      setCellProps: () => ({
        style: { width: '500px' },
      }),
    },
    {
      name: VouchersParamsKey.QUANTITY,
      label: 'Quantity',
      options: {
        ...defaultOptions,
        customBodyRender: (value: string) => value ?? '--',
      },
    },
    {
      name: VouchersParamsKey.START_DATE,
      label: 'Start Date',
      options: {
        ...defaultOptions,
        sort: true,
        customBodyRender: (value: string) => formatValueOrNull(formatDate(value)),
      },
    },
    {
      name: VouchersParamsKey.EXP_DATE,
      label: 'Expiration Date',
      options: {
        ...defaultOptions,
        sort: true,
        customBodyRender: (value: string) => formatValueOrNull(formatDate(value)),
      },
    },
    {
      name: VouchersParamsKey.STATUS,
      label: 'Status',
      options: {
        ...defaultOptions,
        customBodyRender: (value, meta) => {
          const { tableData, rowIndex } = meta;
          const rowData = tableData.at(rowIndex) as GetVouchersResponse;
          const status =
            new Date(rowData.endDate) > new Date() &&
            new Date(rowData.startDate) < new Date() &&
            +rowData.quantity > 0
              ? VoucherStatus.VALID
              : VoucherStatus.INVALID;
          return renderVoucherStatus(status);
        },
      },
    },
    {
      name: VouchersParamsKey.ACTION,
      label: 'Actions',
      options: {
        ...defaultOptions,
        customBodyRender: (
          _value: string,
          meta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: GetVouchersResponse[] }),
        ) => {
          const { tableData, rowIndex } = meta;
          const rowData = tableData.at(rowIndex) as GetVouchersResponse;
          return <ActionButton record={rowData} />;
        },
        setCellHeaderProps: () => ({ style: { textAlign: 'center' } }),
      },
    },
  ];

  return columns;
};
