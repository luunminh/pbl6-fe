import React, { useState } from 'react';
import {
  Stack,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  TextField,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent,
  DialogContentText,
  Typography,
  Box,
} from '@mui/material';
import { IoLockClosed } from 'react-icons/io5';

type PropsType = {
  handleClose: () => void;
};

const DelStaffDialog = ({ handleClose }: PropsType) => {
  const [role, setRole] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  return (
    <>
      <DialogContent sx={{ margin: '20px 0', padding: '0 25px' }}>
        <Stack
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', rowGap: '20px' }}
        >
          <Box
            sx={{
              backgroundColor: '#feecee',
              borderRadius: '50%',
              height: '80px',
              width: '80px',
              position: 'relative',
            }}
          >
            <IoLockClosed
              size="50px"
              color="#db221a"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Box>
          <Typography variant="h5" fontWeight={600}>
            Deactivate Staff
          </Typography>
          <DialogContentText>
            Do you want to deactivate this staff? This action can't be undone
          </DialogContentText>
        </Stack>
      </DialogContent>
      <DialogActions
        className="dialog__actions"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Button variant="outlined" onClick={handleClose} className="btn btn-cancel">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleClose} className="btn btn-del">
          Yes
        </Button>
      </DialogActions>
    </>
  );
};

export default DelStaffDialog;
