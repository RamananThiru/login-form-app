// src/apiConfig.js

// Define the base URL for your API 
export const API_BASE_URL = "http://127.0.0.1:3000";  // Replace with your API's base URL
const getJwtToken = () => localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");

// Optional: You can also define additional settings such as timeout or headers if needed
export const API_TIMEOUT = 5000;  // Example: 5 seconds timeout for requests

// Optional: Add default headers, authentication token, etc.
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  ...(getJwtToken() && { "Authorization": `Bearer ${getJwtToken()}` }),  // Add Authorization header if token exists

};

export const getDefaultHeaders = () => {
  return {
    "Content-Type": "application/json",
    ...(getJwtToken() && { "Authorization": `Bearer ${getJwtToken()}` }), // Conditionally add Authorization header
  };
};

// You can extend the file with other configurations like error handling, environment checks, etc.
