import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { CategoryListParams, CategoryPayload } from './type';
import { AuthService, stringify } from '@shared';
import { ApiKey } from '@queries/keys';

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

  const getCategoryList = (params: CategoryListParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    return api.get(`${ApiKey.CATEGORY}?${queryString}`);
  };

  const getCategoryDetails = (id: string) => {
    return api.get(`${ApiKey.CATEGORY}/${id}`);
  };

  const addCategory = (payload: CategoryPayload) => {
    return api.post(`${ApiKey.CATEGORY}`, payload);
  };

  const updateCategory = (payload: CategoryPayload) => {
    const { id, ...body } = payload;
    return api.patch(`${ApiKey.CATEGORY}/${id}`, body);
  };

  return {
    getCategoryList,
    getCategoryDetails,
    addCategory,
    updateCategory,
  };
};

export default {
  create,
};
