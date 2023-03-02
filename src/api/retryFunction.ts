import { useRefreshToken } from './useRefreshToken';
import { loginRequiredReturn } from '../constants/objectData';

export const retryFunction = async (sendRequest: any, isUseArg: boolean, args?: any) => {
  let res: any;
  try {
    if (isUseArg) {
      res = await sendRequest(args);
    } else {
      res = await sendRequest();
    }
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      const isRefreshValid = await useRefreshToken();
      if (!isRefreshValid) {
        return loginRequiredReturn;
      }
      try {
        if (isUseArg) {
          res = await sendRequest(args);
        } else {
          res = await sendRequest();
        }
      } catch (err) {
        res = err;
      }
    } else {
      res = err;
    }
  }
  return res;
};
