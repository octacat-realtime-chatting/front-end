// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

let store;

export const injectStore = (_store) => {
  store = _store;
};

const apiServices = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || 'https://octacat-chatting-backend.fly.dev/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiServices.interceptors.request.use(
  (config) => {
    const { token } = store.getState().auth;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch({ type: 'auth/logout' });
    }

    if (error?.response?.data) {
      const resolveError = error.response.data;
      resolveError.code = error.response.status;
      return Promise.reject(resolveError);
    }

    return Promise.reject(error);
  },
);

export default apiServices;
