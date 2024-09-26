// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-api-url',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = Bearer ${token};
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('http://your-api-url/refresh-token', { refreshToken });
        localStorage.setItem('accessToken', response.data.accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token is invalid, logout the user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default api;