import axios from 'axios';

export const setHeader = (token: any) => {
  axios.defaults.headers.common['authorization'] = 'Bearer ' + token;
};

export const setCustomHeader = (type: string, value: any) => {
  axios.defaults.headers.common[type] = value;
};
