import api from '@/config/axios';
import axios from 'axios';

const ENDPOINT = '/auth';

export const signIn = async (username, password) => {
  return await axios.post(
    `http://anataarisa.hopto.org:8080/api/v1/auth/authenticate`,
    {
      username: username,
      password: password,
    }
  );
};

export const reToken = async (refreshToken) => {
  return await axios.post(
    `http://anataarisa.hopto.org:8080/api/v1/auth/re-token`,
    {},
    {
      headers: {
        token: `${refreshToken}`,
      },
    }
  );
};
