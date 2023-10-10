import React from 'react';
import { Stack, DialogContentText, Typography, Box } from '@mui/material';
import { IoLockClosed } from 'react-icons/io5';
import { COLOR_CODE } from '@components';

const DeactivateStaffForm = () => {
  return (
    <>
      <Stack
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', rowGap: '20px' }}
      >
        <Box
          sx={{
            backgroundColor: COLOR_CODE.RED_200,
            borderRadius: '50%',
            height: '80px',
            width: '80px',
            position: 'relative',
          }}
        >
          <IoLockClosed
            size="50px"
            color={COLOR_CODE.RED_500}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Box>
        <Typography variant="h3" fontWeight={600}>
          Deactivate Staff
        </Typography>
        <DialogContentText>Are you sure you want to deactivate this staff?</DialogContentText>
      </Stack>
    </>
  );
};

export default DeactivateStaffForm;
