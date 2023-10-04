import { Avatar, Button, FormLabel, InputLabel, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { TfiAngleDown } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';
import { COLOR_CODE } from 'src/modules/components/configs/theme';
import { PATHS } from 'src/appConfig/paths';
import {
  ChangePassword,
  CustomDropdown,
  DialogContext,
  DialogType,
  Input,
  MuiTextField,
  RoleTitle,
  UserProfileType,
} from '@components';
import { getErrorMessage, getFullName } from '@shared';
import { DropdownItem } from '@components';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import { getShortName } from './helpers';

const UserMenu: React.FC<Props> = ({ profile }) => {
  //   const { logout } = useLogout();
  const navigate = useNavigate();
  const { openModal, closeModal, setDialogContent } = React.useContext(DialogContext);

  const { id, firstName, lastName, avatarUrl, email } = profile;

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

  const handleChangePassword = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Change Password',
      data: <ChangePassword id={'1'} />,
      maxWidth: 'sm',
    });

    openModal();
  };

  const menuOptions: DropdownItem[] = React.useMemo(
    () => [
      {
        label: 'My Profile',
        onClick: () => {
          navigate(PATHS.profile);
        },
        icon: <AiOutlineUser size={18} />,
      },
      {
        label: 'Change Password',
        onClick: () => {
          handleChangePassword();
        },
        icon: <AiOutlineLock size={18} />,
      },
      {
        label: 'Log out',
        onClick: () => {
          //   handleLogOut();
        },
        icon: <IoLogOutOutline size={18} />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <CustomDropdown
      flexPosition="flex-end"
      label={
        <Stack
          flexDirection="row"
          alignItems="center"
          spacing={1}
          gap={2}
          sx={{
            cursor: 'pointer',
            p: 1,
            '&:hover': {
              bgcolor: COLOR_CODE.GREY_100,
              borderRadius: 1,
            },
          }}
        >
          <Avatar
            sx={{ width: 32, height: 32, bgcolor: COLOR_CODE.PRIMARY, fontSize: 13 }}
            src={undefined}
          >
            {getShortName({ ...profile })}
          </Avatar>
          <Stack alignItems={'start'}>
            <Stack flexDirection={'row'} gap={2} alignItems={'center'}>
              <Typography variant="h6" whiteSpace={'nowrap'}>
                {getFullName({ ...profile })}
              </Typography>
              <TfiAngleDown color={COLOR_CODE.GREY_500} size={11} />
            </Stack>
            <Typography fontSize={12} color={COLOR_CODE.GREY_600}>
              {RoleTitle[profile.role.roleId]}
            </Typography>
          </Stack>
        </Stack>
      }
      items={menuOptions}
    />
  );
};

type Props = {
  profile: UserProfileType;
};

export default UserMenu;
