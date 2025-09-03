// utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", //backend url
  timeout: 10000,
  withCredentials: true, 
});

// atteching token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get token from frontend storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Global  errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
