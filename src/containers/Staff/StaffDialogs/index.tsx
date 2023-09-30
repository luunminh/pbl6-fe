import { useState } from 'react';
import { Button, IconButton, Dialog, DialogTitle, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddStaffDialog from './AddStaffDialog';
import EditStaffDialog from './EditStaffDialog';
import DelStaffDialog from './DelStaffDialog';
import './styles.scss';

function SimpleDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [dialogCalled, setDialogCalled] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setDialogCalled('add');
          handleOpen();
        }}
      >
        Add new staff
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setDialogCalled('edit');
          handleOpen();
        }}
      >
        Edit staff
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setDialogCalled('del');
          handleOpen();
        }}
      >
        Deactivate staff
      </Button>
      <Dialog onClose={handleClose} open={open} className="dialog__staff">
        <DialogTitle
          className="dialog__title"
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Typography variant="h5" component="p" sx={{ fontWeight: 600 }}>
            {dialogCalled === 'add'
              ? 'Add New Staff'
              : dialogCalled === 'edit'
              ? 'Edit Staff'
              : ''}
          </Typography>
          <IconButton aria-label="close" onClick={handleClose} sx={{ color: '#6d7176' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {dialogCalled === 'add' && <AddStaffDialog handleClose={handleClose} />}
        {dialogCalled === 'edit' && <EditStaffDialog handleClose={handleClose} />}
        {dialogCalled === 'del' && <DelStaffDialog handleClose={handleClose} />}
      </Dialog>
    </>
  );
}

export default SimpleDialog;
