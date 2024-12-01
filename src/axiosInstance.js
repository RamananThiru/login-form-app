import axios from "axios";
import { API_BASE_URL } from "../src/config/apiConfig";


export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,  // Set the base URL for all requests
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Only add the Authorization header if the 'noAuth' flag is not set
    if (!config.noAuth) {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    // Return the modified config
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) { // Non 200 range response codes error handler

      const { status, data } = error.response;
      
      // Check if the response contains 'errors' key
      if (data.errors) {
        // If 'errors' key exists, return it with the response data
        console.error('API Error:', data.errors, data.message);
        return Promise.reject(data);  // Return the errors back to the caller
      } else {
        // If no 'errors' key, return a default error message
        console.error('API Error:', data.errors || 'Something went wrong');
        return Promise.reject(data);
      }
    } else {
      // If no response is received from the server (e.g., network error)
      console.error('Network error or no response');
      return Promise.reject({
        message: 'Network error or no response from server',
      });
    }
  }
);
