import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '@appConfig/images';
import { PATHS } from '@appConfig/paths';
// import { useProfile } from 'src/queries';
import UserMenu from './UserMenu';
import { Image, UserRole, UserProfileType, COLOR_CODE } from '@components';
const profile: UserProfileType = {
  id: '1',
  firstName: 'Minh',
  lastName: 'Luu',
  avatarUrl: null,
  role: UserRole.ADMIN,
  email: 'minh_luu@datahouse.com',
  address: '1123',
  phoneNumber: '09123124123',
};

const Navbar: React.FC<Props> = () => {
  //   const { profile } = useProfile();

  return (
    <>
      <AppBar variant="elevation" elevation={0} position="fixed">
        <Toolbar variant="regular">
          <Stack
            width="100%"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" justifyItems="center" gap={1}>
              <Link to={PATHS.root} className="is-flex">
                <Image src={IMAGES.logo} sx={{ height: '34px' }} />
              </Link>
              <Typography fontSize={24} color={COLOR_CODE.GREY_900}>
                MALT
              </Typography>
            </Stack>

            <UserMenu profile={profile} />
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

type Props = {};

export default Navbar;
