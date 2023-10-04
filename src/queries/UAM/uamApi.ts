import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { ChangePasswordPayload, UpdateProfilePayload } from './type';
import { ApiKey } from '@queries/keys';

axios.defaults.withCredentials = true;
const create = (baseURL = `${appConfig.API_URL}`) => {
  //
  // Create and configure an apisauce-based api object.
  //

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4OTExZDc2Yy0yYWZmLTQwODctYjM0NC1kMDM0YWI4MGZkZDciLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk2NDM1NDE4LCJleHAiOjE2OTY0MzYwMTh9.Y2kz-34_PlIgx76qmUtqFxLqVea5GTodCxoA2hP2hMw`;
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

  //TODO update jwt token

  const getProfile = () => {
    return api.get(`${ApiKey.USERS}/profile`, {});
  };

  const updateProfile = (body: UpdateProfilePayload) => {
    return api.patch(`${ApiKey.USERS}/profile`, body, {});
  };

  const changePassword = (body: ChangePasswordPayload) => {
    return api.post(`${ApiKey.USERS}/update-password`, body, {});
  };

  return {
    getProfile,
    updateProfile,
    changePassword,
  };
};

export default {
  create,
};
