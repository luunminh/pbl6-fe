import React from 'react';
import { IMAGES } from 'src/appConfig/images';
import { Stack } from '@mui/material';

const SplashScreen: React.FC<Props> = () => (
  <Stack>
    <img src={IMAGES.logo} alt="" />
  </Stack>
);

type Props = {};

export default SplashScreen;
