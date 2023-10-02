import React, { ReactNode } from 'react';
import { IMAGES } from 'src/appConfig/images';
import './styles.scss';
import { Stack, Typography } from '@mui/material';

const Dashboard: React.FC<Props> = ({
  children = (
    <>
      This page is on the way of development, please come back later. <br /> We are sorry for this
      inconvenience.
    </>
  ),
}) => (
  <Stack className="ctn-od">
    <img src={IMAGES.OnDevelopImg} alt="" />
    <Typography fontSize={52}>Oops!...</Typography>
    <Typography>{children}</Typography>
  </Stack>
);

type Props = {
  children?: ReactNode;
};

export default Dashboard;
