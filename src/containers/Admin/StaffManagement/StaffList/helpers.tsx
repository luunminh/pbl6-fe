import { Chip } from '@mui/material';
import { getStartCase } from 'src/modules/shared';
import { ROLE_ID, ROLE_NAME, STATUS, UserRoles } from 'src/queries';

export const UserRoleOptions = [
  {
    label: getStartCase(ROLE_NAME[ROLE_ID._ADMIN]),
    value: ROLE_ID._ADMIN,
  },
  {
    label: getStartCase(ROLE_NAME[ROLE_ID._STAFF]),
    value: ROLE_ID._STAFF,
  },
];

export const UserStatusOptions = [
  {
    label: STATUS._ACTIVE,
    value: true,
  },
  {
    label: STATUS._INACTIVE,
    value: false,
  },
];

export enum USER_FILTER_QUERY_KEY {
  _USER_ROLE = 'roles',
  _STATUS = 'active',
}

export const filterParamsKey = [USER_FILTER_QUERY_KEY._USER_ROLE, USER_FILTER_QUERY_KEY._STATUS];

export const customStatusRender = (deleteAt: string) => {
  if (!deleteAt) return <Chip label={STATUS._ACTIVE} color="success" />;
  return <Chip label={STATUS._INACTIVE} color="secondary" />;
};

export const customRoleRender = (userRoles: UserRoles[]) => {
  if (!userRoles) return '--';
  const roleId = userRoles[0].roleId;
  switch (roleId) {
    case ROLE_ID._ADMIN:
      return <Chip label={ROLE_NAME[roleId]} color="info" />;
    case ROLE_ID._STAFF:
      return <Chip label={ROLE_NAME[roleId]} color="warning" />;
    case ROLE_ID._USER:
    default:
      return <Chip label={ROLE_NAME[roleId]} color="info" />;
  }
};

export type FormValue = {
  roles: number[];
  active: string;
};

export const emptyFormValueFilter: FormValue = {
  roles: [],
  active: null,
};
