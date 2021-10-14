import api from '@/api';

export const login = function (data: any) {
  return api({
    url: '/posts',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
};

export const signUp = function (data: any) {
  return api({
    url: '/auth/signup',
    method: 'post',
    headers: {
      'public-request': 'true',
    },
    data: data,
  });
};
