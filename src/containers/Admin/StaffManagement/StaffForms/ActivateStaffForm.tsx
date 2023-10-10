import React from 'react';
import { Stack, DialogContentText, Typography, Box } from '@mui/material';
import { BsUnlockFill } from 'react-icons/bs';
import { COLOR_CODE } from '@components';

const ActivateStaffForm = () => {
  return (
    <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', rowGap: '20px' }}>
      <Box
        sx={{
          backgroundColor: COLOR_CODE.PRIMARY_200,
          borderRadius: '50%',
          height: '80px',
          width: '80px',
          position: 'relative',
        }}
      >
        <BsUnlockFill
          size="50px"
          color={COLOR_CODE.PRIMARY_500}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Box>
      <Typography variant="h3" fontWeight={600}>
        Activate Staff
      </Typography>
      <DialogContentText>Are you sure you want to activate this staff?</DialogContentText>
    </Stack>
  );
};

export default ActivateStaffForm;
