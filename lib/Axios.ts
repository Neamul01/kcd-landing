// axiosInterceptorInstance.ts

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.kcddhaka.org/api/v1", // Replace with your API base URL
});

axiosInstance.interceptors.request.use(
  // @ts-ignore
  (config: AxiosRequestConfig) => {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify the response data here if needed
    return response;
  },
  (error: AxiosError) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default axiosInstance;
