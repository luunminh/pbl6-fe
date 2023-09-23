import React from 'react';
import { IMAGES } from 'src/appConfig/images';
import './styles.scss';
import { Stack } from '@mui/material';

const SplashScreen: React.FC<Props> = () => (
  <Stack>
    <img src={IMAGES.logo} />
  </Stack>
);

type Props = {};

export default SplashScreen;
