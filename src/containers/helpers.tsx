import { PATHS } from '@appConfig/paths';
import { CustomErrorBoundary } from '@components';
import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import Dev from './Dev';
import SplashScreen from './StartupContainers/SplashScreen';
const OnDevelop = React.lazy(() => import('./StartupContainers/OnDevelop'));
const StaffList = React.lazy(() => import('./Admin/StaffManagement/StaffList'));
const ProductList = React.lazy(() => import('./Admin/ProductManagement/ProductList'));
const CustomerList = React.lazy(() => import('./Admin/CustomerManagement/CustomerList'));
const CategoryList = React.lazy(() => import('./Admin/CategoryManagement/CategoryList'));
const ImportOrderList = React.lazy(() => import('./Admin/ImportOrderManagement/ImportOrderList'));
const StoreList = React.lazy(() => import('./Admin/StoreManagement/StoreList'));
const UserProfile = React.lazy(() => import('@components/UserProfile/UserProfile'));
const SignIn = React.lazy(() => import('@components/UAMContainer/SignIn'));
const ForgotPassword = React.lazy(() => import('@components/UAMContainer/ForgotPassword/'));
const ResetPassword = React.lazy(() => import('@components/UAMContainer/ResetPassword/'));
const Vouchers = React.lazy(() => import('./Admin/Voucher/List'));
const Dashboard = React.lazy(() => import('./Admin/Dashboard'));

type RouteWrapperProps = {
  isAuthenticated: boolean;
  pageRequiredAuth?: boolean;
  pageForAuthentication?: boolean;
};

export const CustomRoute: React.FC<PropsWithChildren<RouteWrapperProps>> = ({
  isAuthenticated,
  pageRequiredAuth,
  children,
}) => {
  if (isAuthenticated === null) return <SplashScreen />;

  if ((isAuthenticated && pageRequiredAuth) || (!isAuthenticated && !pageRequiredAuth)) {
    return <CustomErrorBoundary showErrorMessage>{children}</CustomErrorBoundary>;
  }

  const redirectPath = isAuthenticated ? PATHS.root : PATHS.signIn;

  return <Navigate to={redirectPath} />;
};

export const routerGroup = [
  { path: PATHS.root, element: <Dashboard />, isRequireAuth: true },
  { path: PATHS.signIn, element: <SignIn />, isRequireAuth: false },
  { path: PATHS.forgotPassword, element: <ForgotPassword />, isRequireAuth: false },
  { path: PATHS.resetPassword, element: <ResetPassword />, isRequireAuth: false },
  { path: PATHS.dashboard, element: <Dashboard />, isRequireAuth: true },
  { path: PATHS.category, element: <CategoryList />, isRequireAuth: true },
  { path: PATHS.importOrder, element: <ImportOrderList />, isRequireAuth: true },
  { path: PATHS.store, element: <StoreList />, isRequireAuth: true },
  { path: PATHS.order, element: <OnDevelop />, isRequireAuth: true },
  { path: PATHS.staff, element: <StaffList />, isRequireAuth: true },
  { path: PATHS.product, element: <ProductList />, isRequireAuth: true },
  { path: PATHS.customer, element: <CustomerList />, isRequireAuth: true },
  { path: PATHS.profile, element: <UserProfile />, isRequireAuth: true },
  { path: PATHS.voucher, element: <Vouchers />, isRequireAuth: true },
  { path: PATHS.dev, element: <Dev />, isRequireAuth: true },
];
