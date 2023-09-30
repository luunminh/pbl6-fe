import React from 'react';
import { Stack } from '@mui/material';
import StaffDialogs from './StaffDialogs';

const Staff: React.FC<Props> = () => {
  return (
    <>
      <Stack direction="row" spacing={2} sx={{ padding: '2rem 0 0 2rem' }}>
        <StaffDialogs />
      </Stack>
    </>
  );
};

type Props = {};

export default Staff;
