/* eslint-disable no-undef */
import axios from 'axios';
import { PER_PAGE } from 'constants/pagination';

const token = localStorage.getItem('token');

const http = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
});

if (token) {
  http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.method === 'get') {
      config.params = config.params || {};
      config.params.perPage = PER_PAGE;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default http;
