/* eslint-disable react/self-closing-comp */
import { Stack } from '@mui/material';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MINI_SIDE_BAR_WIDTH, NAVBAR_HEIGHT } from '@appConfig/constants';
import { PATHS } from 'src/appConfig/paths';
import { CustomErrorBoundary, CustomDialog, UserProfile, COLOR_CODE } from '@components';
import Dev from './Dev';

const OnDevelop = React.lazy(() => import('./StartupContainers/OnDevelop'));
const LoadingContainer = React.lazy(() => import('../modules/components/LoadingContainer'));
const StaffManagement = React.lazy(() => import('./Admin/StaffManagement/StaffList'));
const CustomerList = React.lazy(() => import('./Admin/CustomerManagement/CustomerList'));
const NotFound = React.lazy(() => import('./StartupContainers/NotFound'));
const ToastContainer = React.lazy(() => import('./StartupContainers/ToastContainer'));
const Sidebar = React.lazy(() => import('./StartupContainers/SideBar'));
const Navbar = React.lazy(() => import('./StartupContainers/NavBar'));
// import SplashScreen from './StartupContainers/SplashScreen';

type ContainerProps = {};

const Container: React.FC<ContainerProps> = () => {
  return (
    <Stack
      sx={{
        paddingTop: `${NAVBAR_HEIGHT}px`,
        paddingLeft: `${MINI_SIDE_BAR_WIDTH}px`,
        background: COLOR_CODE.GREY_50,
      }}
      style={{ position: 'relative', minHeight: '100vh' }}
    >
      <Navbar />
      <Sidebar />
      <Suspense fallback={<LoadingContainer />}>
        <Routes>
          <Route path={PATHS.root} element={<Navigate to={PATHS.dashboard} />} />
          <Route path={PATHS.dashboard} element={<OnDevelop />} />
          <Route path={PATHS.category} element={<OnDevelop />} />
          <Route path={PATHS.customer} element={<CustomerList />} />
          <Route path={PATHS.order} element={<OnDevelop />} />
          <Route path={PATHS.product} element={<OnDevelop />} />
          <Route path={PATHS.profile} element={<OnDevelop />} />
          <Route path={PATHS.staff} element={<StaffManagement />} />
          <Route path={PATHS.store} element={<OnDevelop />} />
          <Route path={PATHS.dev} element={<Dev />} />
          <Route path={PATHS.profile} element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <CustomErrorBoundary showErrorMessage></CustomErrorBoundary>
      <ToastContainer />
      <CustomDialog />
    </Stack>
  );
};

export default Container;
