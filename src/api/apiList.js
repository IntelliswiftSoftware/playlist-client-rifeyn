import {
  getRequest, putRequest, postRequest, deleteRequest, patchRequest,
} from './axiosUtility';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../constants/messages';

export const GetRequest = (url, header) => getRequest(url, header, true);

export const PutRequest = data => putRequest('/URL/', data, {
  ErrorMessage: ERROR_MESSAGE.PUT_ERROR,
  SuccessMessage: SUCCESS_MESSAGE.PUT_SUCCESS,
});

export const PostRequest = (url, header, data) => postRequest(url, header, data);

export const DelelteRequest = url => deleteRequest(url, {
  ErrorMessage: ERROR_MESSAGE.DELETE_ERROR,
  SuccessMessage: SUCCESS_MESSAGE.DELETE_SUCCESS,
});

export const PatchRequest = (url, header, data) => patchRequest(url, data, {
  ErrorMessage: ERROR_MESSAGE.POST_ERROR,
  SuccessMessage: SUCCESS_MESSAGE.POST_SUCCESS,
});
