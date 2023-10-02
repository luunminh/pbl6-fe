import { IMAGES } from '@appConfig/images';
import { PATHS } from '@appConfig/paths';
import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
// import { useProfile } from 'src/queries';
import { COLOR_CODE, Image, UserProfileType } from '@components';
import UserMenu from './UserMenu';
const profile: UserProfileType = {
  id: '1',
  firstName: 'Minh',
  lastName: 'Luu',
  avatarUrl: null,
  role: { roleId: '3', role: { name: 'Admin', id: 3 } },
  email: 'minh_luu@datahouse.com',
  address: '1123',
  phone: '09123124123',
  gender: 1,
};

const Navbar: React.FC<Props> = () => {
  //   const { profile } = useProfile();

  return (
    <>
      <AppBar
        variant="elevation"
        elevation={0}
        position="fixed"
        style={{ background: COLOR_CODE.WHITE }}
      >
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
