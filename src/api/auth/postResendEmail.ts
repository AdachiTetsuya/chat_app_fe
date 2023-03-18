import { authAxios } from 'api/axios';

export const postResendEmail = async (email: string) => {
  await authAxios
    .post('/dj-rest-auth/registration/resend-email/', { email })
    .then((res) => {
      if (res.data) {
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
