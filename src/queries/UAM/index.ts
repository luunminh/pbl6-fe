import uamApi from './uamApi';

export * from './type';
export * from '../Profile/useChangePassword';
export * from '../Profile/useUpdateProfile';

export const UAMApi = uamApi.create();
