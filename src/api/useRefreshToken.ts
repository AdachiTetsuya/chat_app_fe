import { authAxios } from './axios';
import { getValueFor, save } from '../hooks/useSecureStore';

export const useRefreshToken = async (): Promise<boolean> => {
  let result = false;
  const refreshToken = await getValueFor('refreshToken');
  try {
    const res = await authAxios.post('/dj-rest-auth/token/refresh/', { refresh: refreshToken });
    if (res.data && res.data.access) {
      await save('accessToken', res.data.access);
      await save('refreshToken', res.data.refresh);
    }
    result = true;
  } catch (err) {
    console.log(err);
    console.log('refreshトークンが無効');
  }
  return result;
};
