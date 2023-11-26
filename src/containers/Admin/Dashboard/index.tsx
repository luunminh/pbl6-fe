import React, { ReactNode } from 'react';
import { IMAGES } from 'src/appConfig/images';
import { Button, Stack, Typography } from '@mui/material';
import { getDatabase, ref, set } from 'firebase/database';
import { firebaseApp } from 'src/firebase';
import { getRandomId } from '@shared';
import { Image } from '@components';

const Dashboard: React.FC<Props> = ({
  children = (
    <>
      This page is on the way of development, please come back later. <br /> We are sorry for this
      inconvenience.
    </>
  ),
}) => (
  <Stack alignItems="center" mt="113px">
    <Image src={IMAGES.OnDevelopImg} alt="" sx={{ height: '400px' }} />
    {/* TODO: move this one into customer repo */}
    <Typography fontSize={52}>Oops!...</Typography>
    <Typography>{children}</Typography>
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        const db = ref(getDatabase(firebaseApp), '/REQUEST_ORDER');
        set(db, getRandomId()).then(() => console.log('REQUEST_ORDER'));
      }}
    >
      Add noti
    </Button>
  </Stack>
);

type Props = {
  children?: ReactNode;
};

export default Dashboard;
