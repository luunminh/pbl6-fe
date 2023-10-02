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

  api.axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4OTExZDc2Yy0yYWZmLTQwODctYjM0NC1kMDM0YWI4MGZkZDciLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk2OTMwMjM0LCJleHAiOjE2OTcwMTY2MzR9.P4lak75HyBNmDvcgRGb91hfofZD6Fz-Ew8mnvZlTK-Y';
    return Promise.resolve(config);
  });

  //TODO update jwt token

  const getStaffList = (params: StaffListParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    console.log('queryString', queryString);
    return api.get(`/admin/users?${queryString}`, {});
  };

  return {
    getStaffList,
  };
};

export default {
  create,
};
