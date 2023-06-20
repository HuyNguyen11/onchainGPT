import axios from 'axios';
import config from 'src/config';

export const TIME_EXPIRE_TOKEN_CLIENT = 20 * 60 * 1000; //miliseconds

export const setAuthorizationToRequest = (accessToken: string | null) => {
  if (!accessToken) {
    return delete axios.defaults.headers.common['Authorization'];
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  axios.defaults.headers.common['x-app-domain'] = config.auth.domain;
  axios.defaults.headers.common['x-app-version'] = 2;
  axios.defaults.headers.common['x-app-message'] = config.auth.message;
};
