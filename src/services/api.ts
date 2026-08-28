import { BACKEND_URL, REQUEST_TIMEOUT } from '@/constants/const';
import axios, { type AxiosInstance } from 'axios';

// %======================== api ========================% //

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
