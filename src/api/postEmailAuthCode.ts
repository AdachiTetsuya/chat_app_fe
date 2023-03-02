import { authAxios } from './axios';
import { ApiReturn } from '../types/api';
import { authCodePostType } from '../types/authCode';

interface ApiReturnType extends ApiReturn {
  data?: {
    user: object;
    accessToken: string;
    refreshToken: string;
  };
}

export const postEmailAuthCode = async (postData: authCodePostType): Promise<ApiReturnType> => {
  let response = {} as ApiReturnType;

  await authAxios
    .post('/chat-app/email-auth-code/', postData)
    .then((res) => {
      if (res.data) {
        response = {
          result: true,
          data: {
            user: res.data.user,
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token,
          },
        };
      }
    })
    .catch((err) => {
      response = {
        result: false,
        error: err.response!.data!,
      };
    });

  return response;
};
