/* eslint-disable react/self-closing-comp */
import { Stack } from '@mui/material';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MINI_SIDE_BAR_WIDTH, NAVBAR_HEIGHT } from 'src/appConfig/constants';
import { PATHS } from 'src/appConfig/paths';
import { CustomErrorBoundary } from 'src/modules';
import Dev from './Dev';
// import SplashScreen from './StartupContainers/SplashScreen';
const OnDevelop = React.lazy(() => import('./StartupContainers/OnDevelop'));
const LoadingContainer = React.lazy(() => import('./StartupContainers/LoadingContainer'));
const NotFound = React.lazy(() => import('./StartupContainers/NotFound'));
const ToastContainer = React.lazy(() => import('./StartupContainers/ToastContainer'));
const Sidebar = React.lazy(() => import('./StartupContainers/SideBar'));
const Navbar = React.lazy(() => import('./StartupContainers/NavBar'));
const Staff = React.lazy(() => import('./Staff'));

type ContainerProps = {};

const Container: React.FC<ContainerProps> = () => {
  return (
    <Stack
      sx={{
        paddingTop: `${NAVBAR_HEIGHT}px`,
        paddingLeft: `${MINI_SIDE_BAR_WIDTH}px`,
      }}
    >
      <Navbar />
      <Sidebar />
      <Suspense fallback={<LoadingContainer />}>
        <Routes>
          <Route path={PATHS.root} element={<Navigate to={PATHS.dashboard} />} />
          <Route path={PATHS.dashboard} element={<OnDevelop />} />
          <Route path={PATHS.category} element={<OnDevelop />} />
          <Route path={PATHS.customer} element={<OnDevelop />} />
          <Route path={PATHS.order} element={<OnDevelop />} />
          <Route path={PATHS.product} element={<OnDevelop />} />
          <Route path={PATHS.profile} element={<OnDevelop />} />
          <Route path={PATHS.staff} element={<Staff />} />
          <Route path={PATHS.store} element={<OnDevelop />} />
          <Route path={PATHS.dev} element={<Dev />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <CustomErrorBoundary showErrorMessage></CustomErrorBoundary>
      <ToastContainer />
    </Stack>
  );
};

export default Container;
