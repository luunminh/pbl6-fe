import React from 'react';
import { Stack, DialogContentText, Typography, Box } from '@mui/material';
import { BsUnlockFill } from 'react-icons/bs';
import { COLOR_CODE } from '@components';

const StatusStaffForm: React.FC<Props> = ({ isDeactivate }) => {
  const status = isDeactivate ? 'deactivate' : 'activate';

  return (
    <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', rowGap: '20px' }}>
      <Box
        sx={{
          backgroundColor: COLOR_CODE[`${isDeactivate ? 'RED' : 'PRIMARY'}_200`],
          borderRadius: '50%',
          height: '80px',
          width: '80px',
          position: 'relative',
        }}
      >
        <BsUnlockFill
          size="50px"
          color={COLOR_CODE[`${isDeactivate ? 'RED' : 'PRIMARY'}_500`]}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Box>
      <Typography variant="h3" fontWeight={600} textTransform={'capitalize'}>
        {status} Staff
      </Typography>
      <DialogContentText>Are you sure you want to {status} this staff?</DialogContentText>
    </Stack>
  );
};

export type Props = {
  isDeactivate?: boolean;
};

export default StatusStaffForm;
