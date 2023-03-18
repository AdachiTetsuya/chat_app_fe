import { authAxios } from './axios';
import { ApiReturn } from '../types/api';
import { authCodePostType } from '../types/authCode';

type jwtAuthDataType = {
  user: object;
  accessToken: string;
  refreshToken: string;
};

interface ApiReturnType extends ApiReturn {
  data?: {
    type: string;
    jwtAuthData?: jwtAuthDataType;
    resData?: string;
  };
}

export const postEmailAuthCode = async (postData: authCodePostType): Promise<ApiReturnType> => {
  let response = {} as ApiReturnType;

  await authAxios
    .post('/chat-app/email-auth-code/', postData)
    .then((res) => {
      if (res.data) {
        switch (res.data.type) {
          case 'signUp':
            response = {
              result: true,
              data: {
                type: 'signUp',
                jwtAuthData: {
                  user: res.data.user,
                  accessToken: res.data.access_token,
                  refreshToken: res.data.refresh_token,
                },
              },
            };
            break;
          case 'passwordReset':
            response = {
              result: true,
              data: {
                type: 'passwordReset',
                resData: 'ok',
              },
            };
            break;
        }
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
