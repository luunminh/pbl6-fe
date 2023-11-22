import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { AuthService, stringify } from 'src/modules/shared';
import { ApiKey } from '@queries/keys';
import { TableParams } from '@components';
import { getMockVoucherList } from 'src/mocks';

axios.defaults.withCredentials = true;
const create = (baseURL = `${appConfig.API_URL}`) => {
  //
  // Create and configure an apisauce-based api object.
  //
  const token = AuthService.getTokenFromStorage();
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  const getVouchers = (params: TableParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    return getMockVoucherList();
    // return api.get(`/admin/users?${queryString}`, {});
  };

  return {
    getVouchers,
  };
};

export default {
  create,
};
