// apiRequest.js
import { axiosInstance } from './axiosInstance';  // Import axiosInstance which already has interceptors

// API request function
export const apiRequest = async (endpoint, method = 'GET', body = null, config = {}) => {
  try {
    // Make the actual API call using axiosInstance
    const response = await axiosInstance({
      method,
      url: endpoint,
      data: body, 
      ...config,      
    });

    console.log('hello')
    return response.data; // Return response data
  } catch (error) {
    console.log('hello')
    console.log(error)
    // Handle errors if any
    return Promise.reject(error);
  }
};