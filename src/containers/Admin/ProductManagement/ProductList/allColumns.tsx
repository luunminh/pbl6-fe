import { COLOR_CODE } from '@components';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { Callback, formatMoney, tableBodyRender } from '@shared';
import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { IoEye, IoPencil, IoTrashBin } from 'react-icons/io5';
import { CategoryResponse, StaffResponse } from 'src/queries';

type ColumnProps = {
  handleDelete: Callback;
  handleEdit: Callback;
  handleView: Callback;
};

export const allColumns = ({
  handleEdit,
  handleDelete,
  handleView,
}: ColumnProps): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: 'name',
      label: 'Product Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => tableBodyRender(value),
      },
    },
    {
      name: 'category',
      label: 'Category',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: CategoryResponse) => tableBodyRender(value.name),
      },
    },
    {
      name: 'amount',
      label: 'Quantity',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: number) => tableBodyRender<number>(value),
      },
    },
    {
      name: 'price',
      label: 'Price',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: number) => tableBodyRender(formatMoney(value)),
      },
    },
    {
      name: '',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
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
              <Tooltip title="view" arrow placement="top">
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleView(rowData);
                  }}
                >
                  <IoEye color={COLOR_CODE.GREY_600} size={20} />
                </IconButton>
              </Tooltip>
              <Tooltip title="edit" arrow placement="top">
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEdit(rowData);
                  }}
                >
                  <IoPencil color={COLOR_CODE.GREY_600} size={20} />
                </IconButton>
              </Tooltip>
              <Tooltip title="delete" arrow placement="top">
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(rowData);
                  }}
                >
                  <IoTrashBin color={COLOR_CODE.GREY_600} size={20} />
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
