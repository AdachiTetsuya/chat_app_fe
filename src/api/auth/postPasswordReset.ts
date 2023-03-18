import { getValueFor } from 'hooks/useSecureStore';
import { authAxios } from 'api/axios';
import { retryFunction } from 'api/retryFunction';

import { ApiReturn } from 'types/api';
import { setIsLoginRequiredInRes } from 'utils/utils';

type ArgsType = {
  newPassword1: string;
  newPassword2: string;
};

interface ApiReturnType extends ApiReturn {
  data?: object;
}

const sendRequest = async (args: ArgsType) => {
  const token = await getValueFor('accessToken');
  const res = await authAxios.post(
    '/dj-rest-auth/password/reset/confirm/',
    {
      new_password1: args.newPassword1,
      new_password2: args.newPassword2,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res;
};

export const postPasswordReset = async (args: ArgsType): Promise<ApiReturnType> => {
  let response = {} as ApiReturnType;

  const res = await retryFunction(sendRequest, true, args);
  if (res.status === 200) {
    response = { result: true };
  } else {
    response = {
      result: false,
      error: res.response!.data!,
    };
  }
  response = setIsLoginRequiredInRes(res, response);
  return response;
};
