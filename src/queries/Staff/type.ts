import { TableParams } from 'src/modules/components/common/Table';

export enum GENDER {
  _MALE = 1,
  _FEMALE = 0,
}

export const GENDER_NAME = {
  1: 'Male',
  0: 'Female',
};

export enum STATUS {
  _ACTIVE = 'Active',
  _INACTIVE = 'Inactive',
}

export enum ROLE_ID {
  _USER = 1,
  _STAFF = 2,
  _ADMIN = 3,
}

export const ROLE_NAME = {
  1: 'User',
  2: 'Staff',
  3: 'Admin',
};

export type GetPropertiesParams = TableParams & {
  [key: string]: string | number | string[];
};

export type UserRoles = {
  roleId: ROLE_ID;
  role: {
    id: ROLE_ID;
    name: string;
  };
};

export type StaffList = {};

export type StaffListParams = TableParams;

export type StaffResponse = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: GENDER;
  address: string;
  userRoles: UserRoles[];
  createdAt: string;
  deleteAt: string;
}

export type AddStaffPayload = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  gender: number | 0 | 1;
  phone: string;
  email: string;
  address: string;
};
