import client from './axiosClient';

export const putRequest = (url, data, notificationConf) => client({
  method: 'put',
  url,
  data,
  customparams: { showLoading: true, notificationConf },
});

export const postRequest = (url, headers, data) => client({
  method: 'post',
  url,
  data,
  headers,
  customparams: { showLoading: true },
});

export const getRequest = (url, header) => client({
  method: 'get',
  url,
  headers: header,
  data: {},
  customparams: { showLoading: true },
});

export const deleteRequest = (url, notificationConf) => client({
  method: 'delete',
  url,
  data: {},
  customparams: { showLoading: true, notificationConf },
});

export const patchRequest = (url, data, notificationConf) => client({
  method: 'patch',
  url,
  data,
  customparams: { showLoading: true, notificationConf },
});
