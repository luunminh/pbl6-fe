import { DialogContext, DialogType } from '@components';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { GetVouchersResponse, useDeleteVoucher, useGetVouchers } from '@queries';
import { useCallback, useContext } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { IoPencil, IoTrash, IoTrashBin } from 'react-icons/io5';
import { MdModeEditOutline } from 'react-icons/md';
import VoucherForm from '../../../VoucherForm';
import { Toastify } from '@shared';

const ActionButton = ({ record }: Props) => {
  const { openModal, closeModal, setDialogContent } = useContext(DialogContext);

  const handleOpenVoucherModal = useCallback(
    (isEditing = false) => {
      setDialogContent({
        type: DialogType.CONTENT_DIALOG,
        title: `${isEditing ? 'Edit Voucher' : 'Voucher Detail'}`,
        maxWidth: 'md',
        data: <VoucherForm isEditing={isEditing} voucherId={record.id} readOnly={!isEditing} />,
      });

      openModal();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [record],
  );

  const { handleInvalidateVouchers } = useGetVouchers();

  const { deleteVoucher } = useDeleteVoucher({
    onSuccess() {
      handleInvalidateVouchers();
      Toastify.success('Deleted successfully!');
      closeModal();
    },
    onError(error) {
      Toastify.success(error.message);
    },
  });

  const handleOpenDeleteModal = useCallback(() => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      maxWidth: 'xs',
      contentText: 'Delete Voucher',
      subContentText: "Are you sure you want to delete this voucher? This action can't be undone.",
      showIcon: true,
      isWarning: true,
      okText: 'Delete',
      onOk: () => {
        deleteVoucher({ id: record.id });
        closeModal();
      },
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

  const isDisabledExpiredVoucher = new Date(record.startDate) < new Date();

  return (
    <Stack flexDirection={'row'} justifyContent={'center'}>
      <Tooltip title="Detail" arrow>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleOpenVoucherModal();
          }}
        >
          <AiFillEye size={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit" arrow>
        <IconButton
          disabled={isDisabledExpiredVoucher}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleOpenVoucherModal(true);
          }}
        >
          <IoPencil size={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          size="small"
          onClick={handleOpenDeleteModal}
          disabled={isDisabledExpiredVoucher}
        >
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
