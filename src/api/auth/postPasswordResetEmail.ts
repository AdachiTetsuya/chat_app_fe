import { authAxios } from 'api/axios';

import { ApiReturn } from 'types/api';

type postDataType = {
  email: string;
};

interface ApiReturnType extends ApiReturn {
  data?: {
    type: string;
  };
}

export const postPasswordResetEmail = async (postData: postDataType): Promise<ApiReturnType> => {
  let response = {} as ApiReturnType;

  await authAxios
    .post('/dj-rest-auth/password/reset/', postData)
    .then((res) => {
      if (res.data) {
        response = {
          result: true,
          data: {
            type: res.data.type,
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
