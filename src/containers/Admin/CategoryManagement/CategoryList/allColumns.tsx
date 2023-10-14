import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { IconButton, Tooltip } from '@mui/material';
import { IoPencil } from 'react-icons/io5';
import { COLOR_CODE } from '@components';
import { CategoryListResponse, CountType } from '@queries/Category';
import { tableBodyRender, getDate } from '@shared';

type ColumnProps = {
  handleOpenCategoryDialog: (..._args: any[]) => void;
};

export const allColumns = ({ handleOpenCategoryDialog }: ColumnProps): MUIDataTableColumn[] => {
  const columns: MUIDataTableColumn[] = [
    {
      name: 'name',
      label: 'Category Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => tableBodyRender<string>(value),
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => tableBodyRender<string>(value),
        setCellProps: () => ({
          style: { width: '700px' },
        }),
      },
    },
    {
      name: '_count',
      label: 'Stock',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (_count: CountType) => tableBodyRender<number>(_count.products),
      },
    },
    {
      name: 'createdAt',
      label: 'Added Date',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value: string) => tableBodyRender<string>(getDate(value)),
      },
    },
    {
      name: '',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: CategoryListResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex);
          return (
            <Tooltip title="Edit" placement="top" arrow>
              <IconButton
                aria-label="edit category"
                onClick={(event) => {
                  event.stopPropagation();
                  handleOpenCategoryDialog(rowData.id);
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
                <IoPencil color={COLOR_CODE.GREY_600} size={20} />
              </IconButton>
            </Tooltip>
          );
        },
      },
    },
  ];

  return columns;
};
