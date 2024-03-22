// axiosInterceptorInstance.js

import axios from "axios";

const Axios = axios.create({
  baseURL: "https://dev2.kcddhaka.org/api/v1/", // Replace with your API base URL
});

// Request interceptor
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // Modify the request config here (add headers, authentication tokens)

    // If token is present, add it to request's Authorization Header
    if (token) {
      const accessToken = JSON.parse(token);
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
Axios.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default Axios;
