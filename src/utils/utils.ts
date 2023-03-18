import { getValueFor } from '../hooks/useSecureStore';

export const getIsHaveJwt = () => {
  getValueFor('accessToken');
};

export const isResHaveLoginRequired = (res: object) => {
  let result = false;
  if ('loginRequired' in res) {
    result = true;
  }
  return result;
};

export const setIsLoginRequiredInRes = (res: any, response: any) => {
  if (res.status === 401) {
    response.loginRequired = true;
  }
  return response;
};

export const isEmpltyObj = (obj: object) => {
  for (const i in obj) {
    return false;
  }
  return true;
};

export const increment = (index: number) => {
  const result = index + 1;
  return result;
};

export const emailValidation = (email: string) => {
  const strongRegex = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
  let result = false;

  if (strongRegex.test(email)) {
    result = true;
  }

  return result;
};
