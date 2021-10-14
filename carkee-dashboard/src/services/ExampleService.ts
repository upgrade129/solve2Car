import api from '@/api';

export const getPost = function (params?: any) {
  return api({
    url: '/posts/1',
    method: 'get',
    params,
  });
};

export const setPost = function (data: any) {
  return api({
    url: '/posts',
    method: 'post',
    data,
  });
};
