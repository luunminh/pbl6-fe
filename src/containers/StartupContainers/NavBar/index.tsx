import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
// import { useProfile } from 'src/queries';
import UserMenu from './UserMenu';
import { Image } from '@modules/components';
const profile = {
  firstName: 'Minh',
  lastName: 'Luu',
  avatarUrl: null,
  role: 'Admin',
  email: 'minh_luu@datahouse.com',
};

const Navbar: React.FC<Props> = () => {
  //   const { profile } = useProfile();

  const fullName = React.useMemo(() => {
    return profile ? `${profile.firstName} ${profile.lastName}` : '';
  }, [profile]);

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
              <Typography fontSize={24}>MALT</Typography>
            </Stack>

            <UserMenu
              fullName={fullName}
              currentRole={profile?.role}
              avatarUrl={profile?.avatarUrl}
              name={{
                firstName: profile?.firstName,
                lastName: profile?.lastName,
                email: profile?.email,
              }}
            />
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

type Props = {};

export default Navbar;
