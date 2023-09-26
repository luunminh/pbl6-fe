import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { StaffListParams } from './type';
import { stringify } from 'src/modules/shared';

axios.defaults.withCredentials = true;
const create = (baseURL = `${appConfig.API_URL}`) => {
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  //TODO update jwt token

  const getStaffList = (params: StaffListParams) => {
    const { ...tableParams } = params;
    return api.get(`/pets?${stringify(tableParams)}`, {});
  };

  return {
    getStaffList,
  };
};

export default {
  create,
};
