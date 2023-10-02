import { Button, Stack, Typography } from '@mui/material';
import cn from 'classnames';
import React, { useEffect } from 'react';
import { BsChevronLeft, BsDot } from 'react-icons/bs';
import { FaEject } from 'react-icons/fa';
import {
  IoBag,
  IoBagOutline,
  IoCart,
  IoCartOutline,
  IoGrid,
  IoGridOutline,
  IoHome,
  IoHomeOutline,
  IoLogOutOutline,
  IoPeople,
  IoPeopleOutline,
  IoSettings,
  IoSettingsOutline,
  IoStorefront,
  IoStorefrontOutline,
} from 'react-icons/io5';
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { COLOR_CODE } from 'src/modules/components/configs/theme';
import { PATHS } from 'src/appConfig/paths';
import './styles.scss';

type MenuItemType = {
  label: string;
  path?: string;
  activePath: string[] | string;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  subItems?: MenuItemType[];
};

const MenuItems: MenuItemType[] = [
  {
    label: 'Dashboard',
    path: PATHS.dashboard,
    activePath: PATHS.dashboard,
    icon: (
      <div className="title-icon" aria-details="Dashboard">
        <IoHomeOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Dashboard">
        <IoHome size={20} />
      </div>
    ),
  },
  {
    label: 'Product',
    path: PATHS.product,
    activePath: PATHS.product,
    icon: (
      <div className="title-icon" aria-details="Product">
        <IoBagOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Product">
        <IoBag size={20} />
      </div>
    ),
  },
  {
    label: 'Category',
    path: PATHS.category,
    activePath: PATHS.category,
    icon: (
      <div className="title-icon" aria-details="Category">
        <IoGridOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Category">
        <IoGrid size={20} />
      </div>
    ),
  },
  {
    label: 'Order & Invoice',
    path: PATHS.order,
    activePath: PATHS.order,
    icon: (
      <div className="title-icon" aria-details="Order & Invoice">
        <IoCartOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Order & Invoice">
        <IoCart size={20} />
      </div>
    ),
  },
  {
    label: 'Store',
    path: PATHS.store,
    activePath: PATHS.store,
    icon: (
      <div className="title-icon" aria-details="Store">
        <IoStorefrontOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Store">
        <IoStorefront size={20} />
      </div>
    ),
  },
  {
    label: 'Customer',
    path: PATHS.customer,
    activePath: PATHS.customer,
    icon: (
      <div className="title-icon" aria-details="Customer">
        <IoPeopleOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Customer">
        <IoPeople size={20} />
      </div>
    ),
  },
  {
    label: 'Staff',
    path: PATHS.staff,
    activePath: PATHS.staff,
    icon: (
      <div className="title-icon" aria-details="Staff">
        <IoSettingsOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Staff">
        <IoSettings size={20} />
      </div>
    ),
  },
];
const DevItem: MenuItemType = {
  label: 'Dev Container',
  path: PATHS.dev,
  activePath: PATHS.dev,
  icon: (
    <div className="title-icon" aria-details="Dev Container">
      <FaEject size={20} />
    </div>
  ),
  activeIcon: (
    <div className="title-icon" aria-details="Dev Container">
      <FaEject size={20} />
    </div>
  ),
};

const CustomSidebar: React.FC<Props> = () => {
  //   const { logout } = useLogout();
  const location = useLocation();
  const { collapseSidebar, collapsed, toggleSidebar, broken, toggled } = useProSidebar();

  useEffect(() => {
    if (broken) {
      if (collapsed) {
        toggleSidebar(false);
        collapseSidebar(false);
      }
    } else {
      if (toggled) {
        collapseSidebar(false);
      } else {
        toggleSidebar(true);
        collapseSidebar(true);
      }
    }
  }, [broken]);

  const handleToggleSidebar = () => (broken ? toggleSidebar() : collapseSidebar());

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
  //           //   logout();
  //           onHideAllDialog();
  //         },
  //         onCancel: () => {
  //           onHideDialog();
  //         },
  //         maxWidth: 'xs',
  //       },
  //     });
  //   };

  return (
    <Sidebar className={cn('cmp-sidebar')} breakPoint="md">
      <Stack
        className="cmp-sidebar__toggle-icon"
        alignItems="center"
        justifyContent="center"
        onClick={handleToggleSidebar}
        color={COLOR_CODE.GREY_600}
      >
        <BsChevronLeft size={14} />
      </Stack>
      <Stack flexGrow={1} sx={{ height: '100%' }} justifyContent="space-between">
        <Menu>
          {[...MenuItems, DevItem].map((item) => {
            const isActive = Array.isArray(item.activePath)
              ? item.activePath.some((path) => location.pathname.includes(path))
              : location.pathname.includes(item.activePath);
            if (!item.subItems) {
              return (
                <MenuItem
                  active={isActive}
                  icon={isActive ? item.activeIcon : item.icon}
                  component={<Link to={item.path} />}
                  key={item.path}
                >
                  {item.label}
                </MenuItem>
              );
            }
            return (
              <SubMenu
                label={item.label}
                icon={isActive ? item.activeIcon : item.icon}
                key={`sub-menu-${item.label}`}
                defaultOpen
              >
                {item.subItems.map((subItem) => (
                  <MenuItem
                    active={isActive}
                    icon={<BsDot size={24} />}
                    component={<Link to={subItem.path} />}
                    key={subItem.path}
                  >
                    {subItem.label}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          })}
        </Menu>
      </Stack>
    </Sidebar>
  );
};

type Props = {};

export default CustomSidebar;
