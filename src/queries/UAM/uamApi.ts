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

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4OTExZDc2Yy0yYWZmLTQwODctYjM0NC1kMDM0YWI4MGZkZDciLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk2NjA4MjIxLCJleHAiOjE2OTY2MDg4MjF9.9rWKqddgZv5HAePVXoYaUehObBdaPf287tZP3ogCotU`;
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

  const requestChangePassword = () => {
    return api.post(`${ApiKey.USERS}/request-change-password`, {});
  };

  const changePassword = (body: ChangePasswordPayload) => {
    return api.post(`${ApiKey.USERS}/change-password`, body, {});
  };

  return {
    getProfile,
    updateProfile,
    changePassword,
    requestChangePassword,
  };
};

export default {
  create,
};
