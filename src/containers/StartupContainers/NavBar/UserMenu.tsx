import { Avatar, Stack, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import * as React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { COLOR_CODE } from 'src/modules/components/configs/theme';
import { PATHS } from 'src/appConfig/paths';
import { CustomDropdown } from '@modules/components';
// import { useLogout } from 'src/queries';

const UserMenu: React.FC<Props> = ({ avatarUrl, fullName, name }) => {
  //   const { logout } = useLogout();
  const navigate = useNavigate();

  //   const handleLogOut = () => {
  //     onShowDialog({
  //       type: DIALOG_TYPES._YESNO_DIALOG,
  //       data: {
  //         title: 'Log out',
  //         content: (
  //           <Typography fontSize={14} fontWeight={500}>
  //             You are logging out from the admin portal. Do you want to continue?
  //           </Typography>
  //         ),
  //         cancelText: 'Cancel',
  //         okText: 'Log Out',
  //         onOk: () => {
  //           setIsLoggingOut(true);
  //           logout();
  //           onHideAllDialog();
  //         },
  //         onCancel: () => {
  //           onHideDialog();
  //         },
  //         maxWidth: 'xs',
  //       },
  //     });
  //   };

  const menuOptions = React.useMemo(
    () => [
      {
        label: 'Edit My Profile',
        onClick: () => {
          navigate(PATHS.profile);
        },
      },
      {
        label: 'Log out',
        onClick: () => {
          //   handleLogOut();
        },
      },
    ],
    [],
  );

  return (
    <Stack alignItems="center" direction="row" justifyContent="flex-end">
      <Typography color="white" variant="body2">
        {fullName} ({name?.email})
      </Typography>
      <CustomDropdown
        flexPosition="flex-end"
        label={
          <Stack
            flexDirection="row"
            alignItems="center"
            spacing={1}
            gap="4px"
            sx={{
              cursor: 'pointer',
              p: 1,
              '&:hover': {
                bgcolor: COLOR_CODE.PRIMARY_600,
                borderRadius: 1,
              },
            }}
          >
            <Avatar sx={{ width: 48, height: 48, bgcolor: blue[600] }} src={undefined}>
              {fullName ? `${name.firstName[0]}${name.lastName[0]}` : ''}
            </Avatar>
            <AiFillCaretDown color={COLOR_CODE.WHITE} size={12} />
          </Stack>
        }
        items={menuOptions}
      />
    </Stack>
  );
};

type Props = {
  fullName: string;
  currentRole: string;
  avatarUrl?: string;
  name: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export default UserMenu;
