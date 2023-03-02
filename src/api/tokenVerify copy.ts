import { authAxios } from './axios';
import { getValueFor } from '../hooks/useSecureStore';
import { isEmpltyObj } from '../utils/utils';

export const tokenVerify = async (): Promise<boolean> => {
  let result = false;
  const jwt = await getValueFor('accessToken');
  await authAxios
    .post('/dj-rest-auth/token/verify/', { token: jwt })
    .then((res) => {
      if (isEmpltyObj(res.data)) {
        result = true;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};
