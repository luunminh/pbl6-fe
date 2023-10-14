import staffApi from './staffApi';
export * from './type';
export * from './useGetAllStaff';
export * from './useAddStaff';

// export crud queries

export const StaffApi = staffApi.create();
