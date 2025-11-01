import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
console.log(import.meta.env.VITE_API_BASE_URL);

export const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem("accessToken", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common.Authorization;
  }
};

export const getAccessToken = () => localStorage.getItem("accessToken");

export const clearAccessToken = () => {
  localStorage.removeItem("accessToken");
  delete api.defaults.headers.common.Authorization;
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && !config.headers?.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
