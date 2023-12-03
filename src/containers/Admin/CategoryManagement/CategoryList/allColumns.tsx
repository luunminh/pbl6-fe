import { MUIDataTableColumn, MUIDataTableMeta } from 'mui-datatables';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { IoPencil } from 'react-icons/io5';
import { COLOR_CODE, Image } from '@components';
import { CategoryListResponse, CountType } from '@queries/Category';
import { tableBodyRender, getDate, RoleService } from '@shared';
import { IMAGES } from '@appConfig/images';

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
        customBodyRender: (
          value,
          tableMeta:
            | MUIDataTableMeta
            | (Omit<MUIDataTableMeta, 'tableData'> & { tableData: CategoryListResponse[] }),
        ) => {
          const { tableData, rowIndex } = tableMeta;
          const rowData = tableData.at(rowIndex) as CategoryListResponse;
          return (
            <Stack flexDirection="row" alignItems="center" gap={1}>
              <Image
                src={rowData.image || IMAGES.noImage}
                sx={{ width: '80px', height: '80px', objectFit: 'contain' }}
              />
              <Typography variant="body2">{tableBodyRender<string>(value)}</Typography>
            </Stack>
          );
        },
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
      label: `${RoleService.isAdminRole() ? 'Action' : ''}`,
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
          const rowData = tableData.at(rowIndex) as CategoryListResponse;
          return (
            RoleService.isAdminRole() && (
              <Tooltip title="Edit" placement="top" arrow>
                <IconButton
                  aria-label="edit category"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleOpenCategoryDialog(rowData.id);
                  }}
                >
                  <IoPencil color={COLOR_CODE.GREY_600} size={20} />
                </IconButton>
              </Tooltip>
            )
          );
        },
      },
    },
  ];

  return columns;
};
