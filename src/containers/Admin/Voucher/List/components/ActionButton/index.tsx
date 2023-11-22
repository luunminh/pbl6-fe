import { IconButton, Stack, Tooltip } from '@mui/material';
import { GetVouchersResponse } from '@queries';
import { AiFillEye } from 'react-icons/ai';
import { IoPencil, IoTrash, IoTrashBin } from 'react-icons/io5';
import { MdModeEditOutline } from 'react-icons/md';

const ActionButton = ({ record }: Props) => {
  return (
    <Stack flexDirection={'row'} justifyContent={'center'}>
      <Tooltip title="Detail" arrow>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <AiFillEye size={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit" arrow>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <IoPencil size={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        {/* todo: handle onremove */}
        <IconButton size="small">
          <IoTrashBin />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

type Props = {
  record: GetVouchersResponse;
};

export default ActionButton;
