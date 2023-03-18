import { authAxios } from 'api/axios';

import { ApiReturn } from 'types/api';
import { authCodePostType } from 'types/authCode';

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
        if (res.data.type === 'signUp') {
          response = {
            result: true,
            data: {
              type: res.data.type,
            },
          };
        } else {
          response = {
            result: true,
            data: {
              type: res.data.type,
              jwtAuthData: {
                user: res.data.jwt_auth_data.user,
                accessToken: res.data.jwt_auth_data.access_token,
                refreshToken: res.data.jwt_auth_data.refresh_token,
              },
            },
          };
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
