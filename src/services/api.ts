import axios, { type AxiosInstance } from 'axios';

// %======================== api ========================% //


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: `{BACKEND_URL}`,
    timeout: Number(`{REQUEST_TIMEOUT}`)
  });

  return api;
};

